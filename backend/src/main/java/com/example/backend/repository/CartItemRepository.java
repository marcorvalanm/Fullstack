package com.example.backend.repository;

import com.example.backend.model.CartItem;
import com.example.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);
    
    Optional<CartItem> findByCartAndProductId(Cart cart, String productId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart = :cart AND ci.productId = :productId")
    void deleteByCartAndProductId(@Param("cart") Cart cart, @Param("productId") String productId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart = :cart")
    void deleteByCart(@Param("cart") Cart cart);
}
