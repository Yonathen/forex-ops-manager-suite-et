# 🏦 Forex Management System

A comprehensive foreign exchange management platform built with modern technologies to streamline forex operations, customer management, and transaction processing.

## ✨ Features

### 🔐 User & Branch Management
- **Multi-level Authentication**: Secure user authentication with role-based access control
- **Branch Operations**: Create and manage multiple branch locations with detailed address information
- **User Roles & Permissions**: Fine-grained permission system for different user types

### 💱 Exchange Rate Management
- **Real-time Exchange Rates**: Create and manage exchange rates between different currencies
- **Currency Support**: Multi-currency support with base and target currency pairs
- **Transaction Types**: Support for both PURCHASE and SELL transactions
- **Rate History**: Track exchange rate changes over time

### 👥 Customer Management
- **Customer Profiles**: Comprehensive customer information management
- **Bank Account Integration**: Link multiple bank accounts to customer profiles
- **Travel Documents**: Manage customer travel document information
- **Transaction History**: Complete transaction tracking per customer

### 📊 Transaction Processing
- **Transaction Management**: Create, update, and track forex transactions
- **Transaction Items**: Detailed line items for each transaction
- **Exchange Rate Integration**: Automatic rate application to transactions
- **Audit Trail**: Complete transaction history and modifications

### 📈 Reporting & Analytics
- **Dashboard Views**: Comprehensive overview of forex operations
- **Transaction Reports**: Detailed reporting capabilities
- **Customer Analytics**: Customer behavior and transaction patterns

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.1
- **Language**: Java 17
- **Database**: PostgreSQL
- **Authentication**: Spring Security with JWT
- **API Documentation**: OpenAPI/Swagger
- **Build Tool**: Maven
- **ORM**: Spring Data JPA with Hibernate

### Frontend
- **Framework**: Angular 19
- **Language**: TypeScript
- **UI Components**: PrimeNG
- **State Management**: NgRx (Store, Effects, DevTools)
- **Styling**: Tailwind CSS & SCSS
- **Build Tool**: Angular CLI
- **HTTP Client**: Angular HTTP Client with auto-generated API services

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for frontend)
- **Development**: Hot reload support for both frontend and backend

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Java 17+ (for local development)
- Node.js 18+ (for local development)

### Using Docker (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd yoga-forex

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Local Development

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run serve:local
```

## 📁 Project Structure

```
yoga-forex/
├── backend/                 # Spring Boot application
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml             # Maven dependencies
├── frontend/               # Angular application
│   ├── src/app/           # Angular components and services
│   ├── api/               # Auto-generated API client
│   └── package.json       # npm dependencies
└── docker-compose.yml     # Multi-container setup
```

## 🔧 Configuration

### Environment Variables
- `SPRING_PROFILES_ACTIVE`: Set to `docker` for containerized deployment
- `SPRING_DATASOURCE_URL`: PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password

### Development Profiles
- **Local**: `application.yml` - Local development configuration
- **Docker**: `application-docker.yml` - Container environment configuration

## 📚 API Documentation

The API is fully documented using OpenAPI 3.0 specification. Access the interactive documentation at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏗️ Architecture

The application follows a modern microservices-inspired architecture:

- **Backend**: RESTful API with Spring Boot providing secure endpoints
- **Frontend**: Single Page Application (SPA) with Angular for responsive UI
- **Database**: PostgreSQL for reliable data persistence
- **Authentication**: JWT-based stateless authentication
- **API Integration**: Auto-generated TypeScript client from OpenAPI specification
