package com.example.backend.controller;

import com.example.backend.model.Order;
import com.example.backend.model.User;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> request) {
        Integer subtotal = (Integer) request.get("subtotal");
        Integer total = (Integer) request.get("total");
        Integer duocDiscount = request.get("duocDiscount") != null ? (Integer) request.get("duocDiscount") : 0;
        Integer levelDiscount = request.get("levelDiscount") != null ? (Integer) request.get("levelDiscount") : 0;
        String discountApplied = (String) request.get("discountApplied");

        Order order = orderService.createOrder(user, subtotal, total, duocDiscount, levelDiscount, discountApplied);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal User user) {
        List<Order> orders = orderService.getUserOrders(user);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId, @AuthenticationPrincipal User user) {
        Order order = orderService.getOrderById(orderId, user);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("/calculate-discounts")
    public ResponseEntity<OrderService.DiscountInfo> calculateDiscounts(
            @AuthenticationPrincipal User user,
            @RequestParam Integer subtotal) {
        OrderService.DiscountInfo discountInfo = orderService.calculateDiscounts(subtotal, user);
        return ResponseEntity.ok(discountInfo);
    }
}
