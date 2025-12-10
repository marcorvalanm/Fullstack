# Proyecto Full Stack - Backend + Frontend + Base de Datos MySQL

Este proyecto es una aplicación completa de gestión de productos con:

- **Backend**: Spring Boot (Java) con API REST
- **Base de datos**: MySQL
- **Frontend**: React con Bootstrap
- **Comunicación**: API REST con operaciones CRUD completas

## Estructura del Proyecto

```
Fullstack-main/
├── backend/          # API REST con Spring Boot
├── frontend/         # Aplicación React
└── README.md         # Este archivo
```

## Configuración y Ejecución

### 1. Prerrequisitos

- Java 21 o superior
- Maven 3.6 o superior
- Node.js 16 o superior
- MySQL Server
- Git

### 2. Configuración de la Base de Datos MySQL

1. Iniciar MySQL Server
2. Crear base de datos:
```sql
CREATE DATABASE tienda;
```

### 3. Backend - Spring Boot

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Configurar la conexión a MySQL en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tienda?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=  # Configurar tu contraseña
```

3. Ejecutar el backend:
```bash
mvn spring-boot:run
```

El backend estará disponible en: http://localhost:8080

### 4. Frontend - React

1. Navegar a la carpeta frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el frontend:
```bash
npm start
```

El frontend estará disponible en: http://localhost:3000

## Funcionalidades

### API REST Endpoints (Backend)

- `GET /api/v1/products` - Obtener todos los productos
- `GET /api/v1/products/{id}` - Obtener producto por ID
- `POST /api/v1/products` - Crear nuevo producto
- `PUT /api/v1/products/{id}` - Actualizar producto existente
- `DELETE /api/v1/products/{id}` - Eliminar producto

### Interfaz de Usuario (Frontend)

- **Lista de productos**: Vista en tabla con todos los productos
- **Crear producto**: Formulario para agregar nuevos productos
- **Editar producto**: Formulario para modificar productos existentes
- **Eliminar producto**: Botón para eliminar productos con confirmación

### Documentación API

Acceder a Swagger UI: http://localhost:8080/swagger-ui/index.html

## Flujo de Ejecución Completo

1. Iniciar MySQL Server
2. Crear base de datos `tienda`
3. Ejecutar backend (Spring Boot)
4. Ejecutar frontend (React)
5. Abrir http://localhost:3000 en el navegador
6. Comenzar a gestionar productos

## Estructura del Código

### Backend
```
backend/src/main/java/com/example/backend/
├── model/           # Entidades JPA (Product.java)
├── repository/      # Interfaces JpaRepository
├── service/         # Lógica de negocio
├── controller/      # Controladores REST
└── config/          # Configuración CORS
```

### Frontend
```
frontend/src/
├── components/      # Componentes React
│   ├── ProductList.jsx
│   └── ProductForm.jsx
├── pages/           # Páginas principales
│   └── ProductsPage.jsx
├── services/        # Servicios API
│   └── api.js
└── App.jsx          # Componente principal
```

## Tecnologías Utilizadas

### Backend
- Spring Boot 3.5.7
- Spring Data JPA
- MySQL Connector
- SpringDoc OpenAPI (Swagger)

### Frontend
- React 19.2.0
- React Router DOM
- Axios (para llamadas HTTP)
- Bootstrap 5.3.8 (estilos)
