package com.example.demo.controller;

import com.example.demo.model.CartItem;
import com.example.demo.model.User;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@AuthenticationPrincipal User user) {
        List<CartItem> items = cartService.getCartItems(user);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, Object> request) {
        
        String productId = (String) request.get("productId");
        String productName = (String) request.get("productName");
        Integer price = (Integer) request.get("price");
        Integer quantity = request.get("quantity") != null ? (Integer) request.get("quantity") : 1;
        String productImage = (String) request.get("productImage");
        
        CartItem item = cartService.addToCart(user, productId, productName, price, quantity, productImage);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/update")
    public ResponseEntity<CartItem> updateQuantity(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, Object> request) {
        
        String productId = (String) request.get("productId");
        Integer quantity = (Integer) request.get("quantity");
        
        CartItem item = cartService.updateQuantity(user, productId, quantity);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(
            @AuthenticationPrincipal User user,
            @PathVariable String productId) {
        
        cartService.removeFromCart(user, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/empty")
    public ResponseEntity<Boolean> isCartEmpty(@AuthenticationPrincipal User user) {
        boolean isEmpty = cartService.isCartEmpty(user);
        return ResponseEntity.ok(isEmpty);
    }
}
