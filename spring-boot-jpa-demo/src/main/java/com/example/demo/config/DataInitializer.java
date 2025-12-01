package com.example.demo.config;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario admin por defecto si no existe
        if (!userService.getUserByEmail("admin@example.com").isPresent()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword("admin123");
            admin.setAge(30);
            admin.setRole(User.Role.ADMIN);
            
            userService.createUser(admin);
            System.out.println("✅ Usuario admin creado: admin / admin123");
        }

        // Crear usuario regular por defecto si no existe
        if (!userService.getUserByEmail("user@example.com").isPresent()) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPassword("user123");
            user.setAge(25);
            user.setRole(User.Role.USER);
            
            userService.createUser(user);
            System.out.println("✅ Usuario user creado: user / user123");
        }
    }
}
