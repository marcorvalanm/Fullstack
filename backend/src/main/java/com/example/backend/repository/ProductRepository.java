package com.example.backend.repository;

import com.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // No es necesario agregar métodos adicionales ya que JpaRepository proporciona
    // los métodos CRUD básicos (save, findById, findAll, delete, etc.)
}
