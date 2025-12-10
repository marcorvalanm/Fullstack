package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setLastName(request.getLastName());
        user.setBirthDate(request.getBirthDate());
        user.setDuoc(request.isDuoc());
        user.setPoints(0);
        user.setLevel(1);
        user.setRefCode(request.getRefCode());
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "email", user.getEmail(),
            "name", user.getName(),
            "roles", user.getRoles()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login user")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
        
        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "email", user.getEmail(),
            "name", user.getName(),
            "roles", user.getRoles(),
            "level", user.getLevel(),
            "points", user.getPoints(),
            "isDuoc", user.isDuoc()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/validate")
    @Operation(summary = "Validate JWT token")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid token format");
        }
        
        String token = authHeader.substring(7);
        
        if (!jwtUtil.validateToken(token) || jwtUtil.isTokenExpired(token)) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        
        String email = jwtUtil.getEmailFromToken(token);
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        User user = userOpt.get();
        
        return ResponseEntity.ok(Map.of(
            "valid", true,
            "user", Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "roles", user.getRoles(),
                "level", user.getLevel(),
                "points", user.getPoints(),
                "isDuoc", user.isDuoc()
            )
        ));
    }
    
    public static class RegisterRequest {
        private String email;
        private String password;
        private String name;
        private String lastName;
        private String birthDate;
        private boolean duoc;
        private String refCode;
        
        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getBirthDate() { return birthDate; }
        public void setBirthDate(String birthDate) { this.birthDate = birthDate; }
        
        public boolean isDuoc() { return duoc; }
        public void setDuoc(boolean duoc) { this.duoc = duoc; }
        
        public String getRefCode() { return refCode; }
        public void setRefCode(String refCode) { this.refCode = refCode; }
    }
    
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
