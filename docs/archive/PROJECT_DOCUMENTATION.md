# LawyerConnect - Full Stack Legal Consultation Platform

## 🏗️ Project Overview

LawyerConnect is a comprehensive full-stack web application that connects clients with legal professionals. The platform enables users to browse lawyers, book consultations, and handle payments, while providing lawyers with tools to manage their profiles and appointments.

### 🎯 Key Features

- **User Management**: Registration, authentication, and profile management
- **Lawyer Onboarding**: Lawyer profile creation with verification system
- **Booking System**: Appointment scheduling with status tracking
- **Payment Integration**: Secure payment processing for consultations
- **Role-Based Access**: User, Lawyer, and Admin roles with appropriate permissions
- **Rate Limiting**: Built-in API protection against abuse
- **Responsive UI**: Modern React-based frontend with dark/light theme support

---

## 🏛️ Architecture Overview

### Backend Architecture (.NET 8 Web API)
```
LawyerConnect/
├── Controllers/          # API endpoints
├── Models/              # Entity models
├── DTOs/                # Data transfer objects
├── Services/            # Business logic layer
├── Repositories/        # Data access layer
├── Mappers/             # Object mapping utilities
├── Middlewares/         # Custom middleware (rate limiting)
├── Data/                # Database context
└── Migrations/          # EF Core migrations
```

### Frontend Architecture (React + Vite)
```
FrontEnd/src/
├── components/          # React components
│   ├── pages/          # Page components
│   ├── ui/             # Reusable UI components (Radix UI)
│   └── figma/          # Design system components
├── contexts/           # React context providers
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── styles/             # CSS and styling
└── assets/             # Static assets
```

---

## 🛠️ Technology Stack

### Backend Technologies
- **.NET 8**: Modern C# web framework
- **ASP.NET Core Web API**: RESTful API development
- **Entity Framework Core 8**: ORM with SQL Server
- **SQL Server**: Primary database
- **JWT Bearer Authentication**: Secure token-based auth
- **Swagger/OpenAPI**: API documentation
- **HMAC SHA256**: Password hashing

### Fro
ntend Technologies
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

### Development Tools
- **Visual Studio Code**: Primary IDE
- **Postman**: API testing and documentation
- **Git**: Version control
- **npm**: Package management

---

## 📊 Database Schema

### Core Entities

#### Users Table
```sql
Users (
    Id (int, PK, Identity),
    FirstName (nvarchar(100)),
    LastName (nvarchar(100)),
    Email (nvarchar(255), Unique),
    PasswordHash (nvarchar(255)),
    PhoneNumber (nvarchar(20)),
    Role (nvarchar(50)), -- User, Lawyer, Admin
    IsActive (bit),
    CreatedAt (datetime2),
    UpdatedAt (datetime2)
)
```

#### Lawyers Table
```sql
Lawyers (
    Id (int, PK, Identity),
    UserId (int, FK -> Users.Id),
    Specialization (nvarchar(200)),
    Experience (int), -- Years of experience
    HourlyRate (decimal(10,2)),
    Bio (nvarchar(max)),
    IsVerified (bit),
    Rating (decimal(3,2)),
    TotalReviews (int),
    CreatedAt (datetime2),
    UpdatedAt (datetime2)
)
```

#### Bookings Table
```sql
Bookings (
    Id (int, PK, Identity),
    UserId (int, FK -> Users.Id),
    LawyerId (int, FK -> Lawyers.Id),
    BookingDate (datetime2),
    Duration (int), -- Minutes
    Status (nvarchar(50)), -- Pending, Confirmed, Completed, Cancelled
    Notes (nvarchar(max)),
    TotalAmount (decimal(10,2)),
    CreatedAt (datetime2),
    UpdatedAt (datetime2)
)
```

#### Payments Table
```sql
Payments (
    Id (int, PK, Identity),
    BookingId (int, FK -> Bookings.Id),
    Amount (decimal(10,2)),
    Status (nvarchar(50)), -- Pending, Completed, Failed, Refunded
    PaymentMethod (nvarchar(100)),
    TransactionId (nvarchar(255)),
    ProcessedAt (datetime2),
    CreatedAt (datetime2)
)
```

---

## 🔌 API Endpoints

### Authentication Endpoints
```http
POST /api/auth/register/user     # User registration
POST /api/auth/register/lawyer   # Lawyer registration
POST /api/auth/login            # User/Lawyer login
POST /api/auth/refresh          # Token refresh
POST /api/auth/logout           # Logout
```

### User Management
```http
GET    /api/users               # Get all users (Admin only)
GET    /api/users/{id}          # Get user by ID
PUT    /api/users/{id}          # Update user profile
DELETE /api/users/{id}          # Delete user (Admin only)
```

### Lawyer Management
```http
GET    /api/lawyers             # Get all lawyers (with filtering)
GET    /api/lawyers/{id}        # Get lawyer details
PUT    /api/lawyers/{id}        # Update lawyer profile
POST   /api/lawyers/{id}/verify # Verify lawyer (Admin only)
```

### Booking Management
```http
GET    /api/bookings            # Get user's bookings
POST   /api/bookings            # Create new booking
GET    /api/bookings/{id}       # Get booking details
PUT    /api/bookings/{id}       # Update booking
DELETE /api/bookings/{id}       # Cancel booking
```

### Payment Processing
```http
POST   /api/payments/create-session  # Create payment session
POST   /api/payments/confirm         # Confirm payment
GET    /api/payments/{id}            # Get payment details
POST   /api/payments/{id}/refund     # Process refund
```

---

## 🔐 Security Implementation

### Authentication & Authorization
- **JWT Bearer Tokens**: Stateless authentication
- **Role-Based Access Control**: User, Lawyer, Admin roles
- **Password Security**: HMAC SHA256 hashing with salt
- **Token Expiration**: Configurable token lifetime
- **Refresh Token Support**: Secure token renewal

### API Security
- **Rate Limiting**: Custom middleware to prevent abuse
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: DTO validation with data annotations
- **SQL Injection Protection**: Entity Framework parameterized queries

### Frontend Security
- **Token Storage**: Secure token management
- **Route Protection**: Private routes with authentication checks
- **Input Sanitization**: XSS prevention
- **HTTPS Enforcement**: Secure communication

---

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or full instance)
- Visual Studio Code or Visual Studio

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LawyerConnect
   ```

2. **Configure Database**
   ```bash
   # Update connection string in appsettings.json
   # Run migrations
   dotnet ef database update
   ```

3. **Install Dependencies**
   ```bash
   dotnet restore
   ```

4. **Run the API**
   ```bash
   dotnet run
   # API will be available at https://localhost:7001
   ```

### Frontend Setup
1. **Navigate to Frontend Directory**
   ```bash
   cd FrontEnd
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Create .env.local file
   VITE_API_BASE_URL=https://localhost:7001/api
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # Frontend will be available at http://localhost:5173
   ```

---

## 📁 Project Structure Details

### Backend Components

#### Controllers
- **AuthController**: Authentication and authorization endpoints
- **UsersController**: User management operations
- **LawyersController**: Lawyer profile and verification management
- **BookingsController**: Appointment scheduling and management
- **PaymentsController**: Payment processing and transaction handling

#### Services Layer
- **AuthService**: Authentication logic and JWT handling
- **UserService**: User management business logic
- **LawyerService**: Lawyer-specific operations
- **BookingService**: Booking management and validation
- **PaymentService**: Payment processing integration

#### Data Layer
- **LawyerConnectDbContext**: Entity Framework database context
- **Repository Pattern**: Data access abstraction
- **Entity Models**: Database entity definitions

### Frontend Components

#### Pages
- **HomePage**: Landing page with lawyer search
- **LoginPage**: User authentication
- **RegisterPage**: User and lawyer registration
- **DashboardPage**: User/Lawyer dashboard
- **LawyerProfilePage**: Detailed lawyer information
- **BookingPage**: Appointment scheduling interface
- **PaymentPage**: Payment processing interface

#### UI Components
- **Reusable Components**: Built with Radix UI primitives
- **Form Components**: Validated input components
- **Layout Components**: Navigation and page structure
- **Theme System**: Dark/light mode support

---

## 🔄 Development Workflow

### API Development
1. **Model Definition**: Create entity models
2. **Database Migration**: Generate and apply EF migrations
3. **Repository Layer**: Implement data access methods
4. **Service Layer**: Add business logic
5. **Controller**: Create API endpoints
6. **Testing**: Use Postman collection for API testing

### Frontend Development
1. **Component Design**: Create reusable UI components
2. **Service Integration**: Connect to backend APIs
3. **State Management**: Implement React context/state
4. **Routing**: Configure protected routes
5. **Styling**: Apply Tailwind CSS classes
6. **Testing**: Manual testing and user flow validation

---

## 🧪 Testing Strategy

### Backend Testing
- **Unit Tests**: Service layer testing
- **Integration Tests**: API endpoint testing
- **Database Tests**: Repository layer validation
- **Postman Collection**: Comprehensive API testing suite

### Frontend Testing
- **Component Testing**: React component validation
- **Integration Testing**: User flow testing
- **Cross-browser Testing**: Compatibility validation
- **Responsive Testing**: Mobile and desktop layouts

---

## 📈 Performance Considerations

### Backend Optimization
- **Database Indexing**: Optimized query performance
- **Caching Strategy**: Response caching where appropriate
- **Rate Limiting**: API abuse prevention
- **Connection Pooling**: Efficient database connections

### Frontend Optimization
- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Vite build optimization
- **Image Optimization**: Compressed assets
- **Caching Strategy**: Browser caching implementation

---

## 🔧 Configuration

### Backend Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LawyerConnectDb;Trusted_Connection=true"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key",
    "Issuer": "LawyerConnect",
    "Audience": "LawyerConnect-Users",
    "ExpirationMinutes": 60
  },
  "RateLimiting": {
    "RequestsPerMinute": 100,
    "BurstSize": 20
  }
}
```

### Frontend Configuration (.env.local)
```env
VITE_API_BASE_URL=https://localhost:7001/api
VITE_APP_NAME=LawyerConnect
VITE_PAYMENT_PUBLIC_KEY=your-payment-key
```

---

## 🚀 Deployment

### Backend Deployment
- **Azure App Service**: Recommended cloud hosting
- **Docker Support**: Containerized deployment option
- **Database**: Azure SQL Database or SQL Server
- **Environment Variables**: Secure configuration management

### Frontend Deployment
- **Vercel/Netlify**: Static site hosting
- **CDN Integration**: Global content delivery
- **Environment Configuration**: Production environment variables

---

## 📚 Additional Resources

### Documentation
- [API Documentation](LawyerConnect.http) - HTTP requests for testing
- [Postman Collection](LawyerConnect.postman_collection.json) - Complete API testing suite
- [Database Schema](Migrations/) - EF Core migration files

### Development Tools
- **Swagger UI**: Available at `/swagger` when running in development
- **Entity Framework Tools**: Database management and migrations
- **Vite Dev Tools**: Hot reload and development server

---

## 🤝 Contributing

### Code Standards
- **C# Conventions**: Follow Microsoft C# coding standards
- **TypeScript Standards**: Use strict TypeScript configuration
- **Component Structure**: Consistent React component patterns
- **API Design**: RESTful API principles

### Git Workflow
- **Feature Branches**: Create branches for new features
- **Pull Requests**: Code review process
- **Commit Messages**: Descriptive commit messages
- **Version Control**: Semantic versioning

---

## 📞 Support & Contact

For questions, issues, or contributions, please refer to the project repository or contact the development team.

---

*Last Updated: December 2024*
*Version: 1.0.0*