package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(User user, Integer subtotal, Integer total, Integer duocDiscount, Integer levelDiscount, String discountApplied) {
        Order order = new Order(user, subtotal, total, duocDiscount, levelDiscount, discountApplied);
        order = orderRepository.save(order);
        
        List<CartItem> cartItems = cartService.getCartItems(user);
        List<OrderItem> orderItems = new ArrayList<>();
        
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(
                order,
                cartItem.getProductId(),
                cartItem.getProductName(),
                cartItem.getPrice(),
                cartItem.getQuantity(),
                cartItem.getProductImage()
            );
            orderItems.add(orderItemRepository.save(orderItem));
        }
        
        order.setItems(orderItems);
        
        cartService.clearCart(user);
        
        return order;
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    public Order getOrderById(Long orderId, User user) {
        return orderRepository.findById(orderId)
            .filter(order -> order.getUser().getId().equals(user.getId()))
            .orElse(null);
    }

    public Integer calculateSubtotal(List<CartItem> items) {
        return items.stream()
            .mapToInt(item -> item.getPrice() * item.getQuantity())
            .sum();
    }

    public DiscountInfo calculateDiscounts(Integer subtotal, User user) {
        boolean isDuoc = user.getEmail() != null && user.getEmail().toLowerCase().endsWith("@duocuc.cl");
        
        int levelPct = 0;
        int userLevel = getUserLevel(user);
        if (userLevel >= 3) levelPct = 10;
        else if (userLevel >= 2) levelPct = 5;
        
        int levelDiscount = Math.round(subtotal * levelPct / 100.0f);
        int duocDiscount = isDuoc ? Math.round(subtotal * 0.20f) : 0;
        
        String applied = duocDiscount >= levelDiscount ? "duoc" : "level";
        int effectiveDiscount = applied.equals("duoc") ? duocDiscount : levelDiscount;
        int total = Math.max(0, subtotal - effectiveDiscount);
        
        return new DiscountInfo(levelDiscount, duocDiscount, applied, total);
    }

    private int getUserLevel(User user) {
        int points = getUserPoints(user);
        if (points >= 1000) return 3;
        if (points >= 500) return 2;
        return 1;
    }

    private int getUserPoints(User user) {
        return 0;
    }

    public static class DiscountInfo {
        public final int levelDiscount;
        public final int duocDiscount;
        public final String applied;
        public final int total;

        public DiscountInfo(int levelDiscount, int duocDiscount, String applied, int total) {
            this.levelDiscount = levelDiscount;
            this.duocDiscount = duocDiscount;
            this.applied = applied;
            this.total = total;
        }
    }
}
