package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@Tag(name = "Público", description = "API endpoints públicos sin autenticación")
public class PublicController {

    @GetMapping("/info")
    @Operation(summary = "Información pública", description = "Endpoint público accesible sin autenticación")
    public ResponseEntity<Map<String, Object>> getPublicInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("message", "Este es un endpoint público");
        info.put("api", "Spring Boot JPA Demo");
        info.put("version", "1.0.0");
        info.put("status", "Running");
        info.put("access", "PUBLIC - No authentication required");
        
        return ResponseEntity.ok(info);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Verificación de estado del sistema")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", String.valueOf(System.currentTimeMillis()));
        
        return ResponseEntity.ok(health);
    }
}
