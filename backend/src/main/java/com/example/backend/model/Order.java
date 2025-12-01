package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private Integer subtotal;
    
    @Column(nullable = false)
    private Integer total;
    
    @Column
    private Integer duocDiscount = 0;
    
    @Column
    private Integer levelDiscount = 0;
    
    @Column
    private String discountApplied;
    
    @Column(nullable = false)
    private LocalDateTime orderDate;
    
    @Column
    private String status = "PENDING";
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items;
    
    public Order() {}
    
    public Order(User user, Integer subtotal, Integer total, Integer duocDiscount, Integer levelDiscount, String discountApplied) {
        this.user = user;
        this.subtotal = subtotal;
        this.total = total;
        this.duocDiscount = duocDiscount;
        this.levelDiscount = levelDiscount;
        this.discountApplied = discountApplied;
        this.orderDate = LocalDateTime.now();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Integer getSubtotal() {
        return subtotal;
    }
    
    public void setSubtotal(Integer subtotal) {
        this.subtotal = subtotal;
    }
    
    public Integer getTotal() {
        return total;
    }
    
    public void setTotal(Integer total) {
        this.total = total;
    }
    
    public Integer getDuocDiscount() {
        return duocDiscount;
    }
    
    public void setDuocDiscount(Integer duocDiscount) {
        this.duocDiscount = duocDiscount;
    }
    
    public Integer getLevelDiscount() {
        return levelDiscount;
    }
    
    public void setLevelDiscount(Integer levelDiscount) {
        this.levelDiscount = levelDiscount;
    }
    
    public String getDiscountApplied() {
        return discountApplied;
    }
    
    public void setDiscountApplied(String discountApplied) {
        this.discountApplied = discountApplied;
    }
    
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public List<OrderItem> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
