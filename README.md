# Online Clothing Store — Spring Boot Microservices + React

This is a minimal, classroom-friendly project using **Spring Boot 3.3.4 (Java 21)** and a small **React** UI.

## Structure
```
online-clothing-store/
├── product-service/      (Spring Boot, port 8081)
├── customer-service/     (Spring Boot, port 8082)
└── clothing-ui/          (React app, port 3000)
```

## Run – in three terminals

### 1) Product Service
```bash
cd product-service
mvn spring-boot:run
```

### 2) Customer Service
```bash
cd customer-service
mvn spring-boot:run
```

### 3) React UI
```bash
cd clothing-ui
npm install
npm start
```

Then open http://localhost:3000

### Notes
- H2 consoles: http://localhost:8081/h2-console and http://localhost:8082/h2-console
- JDBC URL for both: `jdbc:h2:mem:productdb` or `jdbc:h2:mem:customerdb` (as applicable)
- Username: (leave blank), Password: (leave blank) unless you add credentials
- CORS is open for simplicity (`@CrossOrigin("*")`).

## CRUD
- Products: GET/POST/PUT/DELETE via `/products` (UI covers GET/POST; add edit/delete if you want extra credit).
- Customers: GET/POST/PUT/DELETE via `/customers`.
