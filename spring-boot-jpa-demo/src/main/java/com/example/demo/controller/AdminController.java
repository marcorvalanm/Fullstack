package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Administración", description = "API para funciones administrativas")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
    @Operation(summary = "Dashboard de administrador", description = "Información general del sistema")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        List<User> allUsers = userService.getAllUsers();
        long totalUsers = allUsers.size();
        long adminUsers = allUsers.stream()
                .filter(user -> user.getRole() == User.Role.ADMIN)
                .count();
        long regularUsers = totalUsers - adminUsers;
        
        dashboard.put("totalUsers", totalUsers);
        dashboard.put("adminUsers", adminUsers);
        dashboard.put("regularUsers", regularUsers);
        dashboard.put("systemStatus", "Running");
        dashboard.put("apiVersion", "1.0.0");
        
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/users/role/{role}")
    @Operation(summary = "Obtener usuarios por rol", description = "Filtra usuarios según su rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable User.Role role) {
        List<User> users = userService.getAllUsers().stream()
                .filter(user -> user.getRole() == role)
                .toList();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/users/{id}/promote")
    @Operation(summary = "Promover usuario a administrador", description = "Cambia el rol de un usuario a ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> promoteUser(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            user.setRole(User.Role.ADMIN);
            userService.updateUser(id, user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario promovido a administrador exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/users/{id}/demote")
    @Operation(summary = "Degradar administrador a usuario regular", description = "Cambia el rol de un usuario a USER")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> demoteUser(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            user.setRole(User.Role.USER);
            userService.updateUser(id, user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario degradado a usuario regular exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
