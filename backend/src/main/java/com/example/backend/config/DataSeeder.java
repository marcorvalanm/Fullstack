package com.example.backend.config;

import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Configuration
public class DataSeeder {

        @Bean
        CommandLineRunner initDatabase(ProductRepository productRepository, UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        // Seed Users
                        if (userRepository.count() == 0) {
                                User admin = new User();
                                admin.setEmail("admin@levelup.cl");
                                admin.setPassword(passwordEncoder.encode("admin123"));
                                admin.setName("Admin");
                                admin.setLastName("User");
                                admin.setRoles(new HashSet<>(List.of("ROLE_ADMIN", "ROLE_USER")));
                                userRepository.save(admin);

                                User user = new User();
                                user.setEmail("user@levelup.cl");
                                user.setPassword(passwordEncoder.encode("user123"));
                                user.setName("Normal");
                                user.setLastName("User");
                                user.setRoles(new HashSet<>(List.of("ROLE_USER")));
                                userRepository.save(user);

                                System.out.println("Users seeded!");
                        }

                        // Seed Products
                        // LIMPIAR DB para asegurar imágenes buenas (SOLO DESARROLLO)
                        productRepository.deleteAll();

                        if (productRepository.count() == 0) {
                                List<Product> products = Arrays.asList(
                                                createProduct("Xbox Series X", 649990, "consolas",
                                                                "https://placehold.co/600x400/107C10/FFFFFF/png?text=Xbox+Series+X",
                                                                "La Xbox Series X es la consola más potente de Microsoft."),
                                                createProduct("PlayStation 5", 599990, "consolas",
                                                                "https://placehold.co/600x400/003791/FFFFFF/png?text=PS5",
                                                                "Gráficos impresionantes y DualSense con respuesta háptica."),
                                                createProduct("Nintendo Switch 2", 499990, "consolas",
                                                                "https://placehold.co/600x400/E60012/FFFFFF/png?text=Switch+2",
                                                                "Pantalla OLED grande y retrocompatibilidad."),
                                                createProduct("PC Gamer RTX 4060", 1099990, "pc",
                                                                "https://placehold.co/600x400/000000/FFFFFF/png?text=PC+RTX+4060",
                                                                "Gaming competitivo con gráficos de última generación."),
                                                createProduct("Acer Nitro V 15", 699990, "pc",
                                                                "https://placehold.co/600x400/111111/FFFFFF/png?text=Acer+Nitro",
                                                                "Laptop gamer potente y portable."),
                                                createProduct("Teclado Mecánico RGB", 49990, "accesorios",
                                                                "https://placehold.co/600x400/333333/FFFFFF/png?text=Teclado+RGB",
                                                                "Switches rojos lineales para una experiencia suave."),
                                                createProduct("Mouse Gamer Logitech", 49990, "accesorios",
                                                                "https://placehold.co/600x400/333333/FFFFFF/png?text=Mouse+Logitech",
                                                                "Precisión y personalización al máximo."),
                                                createProduct("Mousepad Razer", 29990, "accesorios",
                                                                "https://placehold.co/600x400/00FF00/000000/png?text=Mousepad",
                                                                "Estilo e iluminación para tu setup."),
                                                createProduct("Control Xbox", 59990, "accesorios",
                                                                "https://placehold.co/600x400/FFFFFF/000000/png?text=Control+Xbox",
                                                                "Precisión, comodidad y control absoluto."),
                                                createProduct("Silla Gamer Secretlab", 399990, "sillas",
                                                                "https://placehold.co/600x400/222222/FFFFFF/png?text=Silla+Gamer",
                                                                "Máxima comodidad y ergonomía."),
                                                createProduct("Catan", 29990, "juegos",
                                                                "https://placehold.co/600x400/FFA500/000000/png?text=Catan",
                                                                "Intercambia recursos y domina la isla."),
                                                createProduct("Carcassonne", 24990, "juegos",
                                                                "https://placehold.co/600x400/0000AA/FFFFFF/png?text=Carcassonne",
                                                                "Construye el paisaje medieval con fichas."),
                                                createProduct("Polera Gamer 1", 14990, "poleras",
                                                                "https://placehold.co/600x400/111111/FFFFFF/png?text=Polera+1",
                                                                "Polera negra con estampado gamer."),
                                                createProduct("Polera Gamer 2", 12990, "poleras",
                                                                "https://placehold.co/600x400/111111/FFFFFF/png?text=Polera+2",
                                                                "Polera negra con logo Gamer Zone."));

                                productRepository.saveAll(products);
                                System.out.println("Products seeded!");
                        }
                };
        }

        private Product createProduct(String title, int price, String category, String img, String descr) {
                Product p = new Product();
                p.setTitle(title);
                p.setPrice(price);
                p.setCategory(category);
                p.setImg(img);
                p.setDescr(descr);
                return p;
        }
}
