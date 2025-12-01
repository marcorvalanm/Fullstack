# Spring Boot JPA Demo

Proyecto de ejemplo con Spring Boot, JPA y base de datos H2 para probar con Postman.

## Requisitos
- Java 17 o superior
- Maven 3.6 o superior
- Postman (para probar los endpoints)

## Ejecutar el proyecto

### Desde terminal:
```bash
cd spring-boot-jpa-demo
mvn spring-boot:run
```

### Desde IDE:
Ejecutar la clase `DemoApplication.java`

## Endpoints disponibles

### Usuarios (http://localhost:8080/api/users)

- **GET** `/api/users` - Obtener todos los usuarios
- **GET** `/api/users/{id}` - Obtener usuario por ID
- **GET** `/api/users/search?name=nombre` - Buscar usuarios por nombre
- **GET** `/api/users/email/{email}` - Obtener usuario por email
- **POST** `/api/users` - Crear nuevo usuario
- **PUT** `/api/users/{id}` - Actualizar usuario
- **DELETE** `/api/users/{id}` - Eliminar usuario

## Ejemplos para Postman

### Crear usuario (POST)
```
URL: http://localhost:8080/api/users
Method: POST
Headers: Content-Type: application/json
Body:
{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "age": 25
}
```

### Obtener todos los usuarios (GET)
```
URL: http://localhost:8080/api/users
Method: GET
```

## Base de datos H2

Puedes acceder a la consola H2 en:
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: password

## Estructura del proyecto

```
src/main/java/com/example/demo/
├── DemoApplication.java     # Clase principal
├── controller/
│   └── UserController.java # Endpoints REST
├── model/
│   └── User.java          # Entidad JPA
├── repository/
│   └── UserRepository.java # Repository JPA
└── service/
    └── UserService.java    # Lógica de negocio
```
