package com.example.backend.service;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Cart getOrCreateCart(User user) {
        Optional<Cart> existingCart = cartRepository.findByUser(user);
        if (existingCart.isPresent()) {
            return existingCart.get();
        }
        
        Cart newCart = new Cart(user);
        return cartRepository.save(newCart);
    }

    public List<CartItem> getCartItems(User user) {
        Cart cart = getOrCreateCart(user);
        return cartItemRepository.findByCart(cart);
    }

    public CartItem addToCart(User user, String productId, String productName, Integer price, Integer quantity, String productImage) {
        Cart cart = getOrCreateCart(user);
        
        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProductId(cart, productId);
        
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem(cart, productId, productName, price, quantity, productImage);
            return cartItemRepository.save(newItem);
        }
    }

    public CartItem updateQuantity(User user, String productId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        Optional<CartItem> item = cartItemRepository.findByCartAndProductId(cart, productId);
        
        if (item.isPresent()) {
            CartItem cartItem = item.get();
            if (quantity <= 0) {
                cartItemRepository.delete(cartItem);
                return null;
            }
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        }
        
        return null;
    }

    public void removeFromCart(User user, String productId) {
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteByCartAndProductId(cart, productId);
    }

    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteByCart(cart);
    }

    public boolean isCartEmpty(User user) {
        List<CartItem> items = getCartItems(user);
        return items.isEmpty();
    }
}
