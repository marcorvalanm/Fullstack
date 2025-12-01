package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Buscar usuario por username (para autenticación)
    Optional<User> findByUsername(String username);
    
    // Buscar usuario por email
    Optional<User> findByEmail(String email);
    
    // Buscar usuarios por username (contiene)
    List<User> findByUsernameContaining(String username);
    
    // Buscar usuarios por edad mayor que
    List<User> findByAgeGreaterThan(int age);
    
    // Query personalizada
    @Query("SELECT u FROM User u WHERE u.username = :name AND u.age >= :age")
    List<User> findByUsernameAndAgeMin(@Param("name") String name, @Param("age") int age);
    
    // Contar usuarios por email
    boolean existsByEmail(String email);
    
    // Contar usuarios por username
    boolean existsByUsername(String username);
    
    // Buscar por rol
    List<User> findByRole(User.Role role);
}
