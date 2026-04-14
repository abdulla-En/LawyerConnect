# LawyerConnect - Legal Consultation Platform

A comprehensive legal consultation platform connecting clients with verified lawyers. Built with ASP.NET Core 8, featuring booking management, real-time chat, Stripe payment processing, and review systems.

## 🎯 Project Status

**✅ BACKEND COMPLETE - READY FOR FRONTEND INTEGRATION**

- ✅ 10 Production-ready services
- ✅ 123 Passing unit tests
- ✅ Zero build errors
- ✅ Zero test failures
- ✅ Stripe payment integration
- ✅ Real-time chat system
- ✅ Comprehensive documentation

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- SQL Server (LocalDB, Express, or Full)
- Stripe account (for payments)

### Run Locally
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/LawyerConnect.git
cd LawyerConnect

# 2. Restore dependencies
dotnet restore

# 3. Update database connection in appsettings.json
# Edit ConnectionStrings:DefaultConnection

# 4. Apply migrations
dotnet ef database update

# 5. Run the application
dotnet run

# 6. Access Swagger UI
# https://localhost:5001/swagger
```

### Run Tests
```bash
# Run all unit tests
dotnet test

# Run with detailed output
dotnet test --logger "console;verbosity=detailed"
```

## 📚 Documentation

### Essential Guides
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was built in Phase 1 & 2
- **[FRONTEND_INTEGRATION_GUIDE.md](FRONTEND_INTEGRATION_GUIDE.md)** - How to integrate frontend with backend
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[BACKEND_DOCUMENTATION.md](BACKEND_DOCUMENTATION.md)** - Complete API reference
- **[CORE_FLOWS_DOCUMENTATION.md](CORE_FLOWS_DOCUMENTATION.md)** - Business workflows

### Additional Resources
- **[UNIT_TESTING_COMPLETE.md](UNIT_TESTING_COMPLETE.md)** - Testing documentation
- **[PROJECT_STUDY_GUIDE.md](PROJECT_STUDY_GUIDE.md)** - Learning resource
- **[LawyerConnect_SRS.md](LawyerConnect_SRS.md)** - Requirements specification
- **[LawyerConnect.http](LawyerConnect.http)** - API testing scenarios

## 🏗️ Architecture

### Tech Stack
- **Framework**: ASP.NET Core 8 Web API
- **Database**: SQL Server with Entity Framework Core 8
- **Authentication**: JWT Bearer tokens (HMAC SHA256)
- **Authorization**: Role-based (User, Lawyer, Admin)
- **Payments**: Stripe integration
- **Testing**: xUnit, Moq, FluentAssertions

### Project Structure
```
LawyerConnect/
├── Controllers/          # API endpoints (10 controllers)
├── Services/            # Business logic (10 services)
├── Repositories/        # Data access layer
├── Models/              # Entity models (15+ models)
├── DTOs/                # Data transfer objects
├── Mappers/             # Entity-DTO conversions
├── Data/                # DbContext and migrations
├── Middlewares/         # Custom middleware
├── LawyerConnect.Tests/ # Unit tests (123 tests)
└── docs/                # Archived documentation
```

### Key Features
- ✅ User & Lawyer registration with verification
- ✅ JWT authentication & role-based authorization
- ✅ Lawyer search with filters (specialization, rating, location)
- ✅ Booking management with time slot conflict detection
- ✅ Stripe payment processing with webhooks
- ✅ Real-time chat system
- ✅ Review & rating system
- ✅ Notification system
- ✅ Admin panel for lawyer verification

## 🔧 Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LawyerConnect;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "Key": "your-secret-key-minimum-32-characters",
    "Issuer": "LawyerConnect",
    "Audience": "LawyerConnectUsers",
    "ExpiryMinutes": 60
  },
  "Stripe": {
    "SecretKey": "sk_test_...",
    "PublicKey": "pk_test_...",
    "WebhookSecret": "whsec_...",
    "Currency": "usd"
  }
}
```

### Environment Variables (Alternative)
```bash
ConnectionStrings__DefaultConnection="Server=...;Database=LawyerConnect;..."
Jwt__Key="your-secret-key"
Stripe__SecretKey="sk_test_..."
Stripe__PublicKey="pk_test_..."
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/register-lawyer` - Register lawyer
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users` - Get all users (admin)

### Lawyers
- `GET /api/lawyers/search` - Search lawyers with filters
- `GET /api/lawyers/{id}` - Get lawyer profile
- `PUT /api/lawyers/{id}/verify` - Verify lawyer (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/lawyer` - Get lawyer bookings
- `POST /api/bookings/{id}/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-session` - Create Stripe payment session
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/{sessionId}` - Get payment status

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/lawyer/{lawyerId}` - Get lawyer reviews

### Chat
- `GET /api/chat/room/{bookingId}` - Get chat room
- `POST /api/chat/message` - Send message
- `GET /api/chat/messages/{bookingId}` - Get messages

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `GET /api/notifications/unread-count` - Get unread count

### Specializations
- `GET /api/specializations` - Get all specializations
- `POST /api/specializations` - Create specialization (admin)

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/lawyers/pending` - Get pending lawyers
- `POST /api/admin/lawyers/{id}/verify` - Verify lawyer
- `POST /api/admin/lawyers/{id}/reject` - Reject lawyer

## 🧪 Testing

### Unit Tests (123 Tests)
```bash
# Run all tests
dotnet test

# Test coverage by service:
# - NotificationService: 10 tests
# - SpecializationService: 12 tests
# - PricingService: 15 tests
# - UserService: 14 tests
# - LawyerService: 12 tests
# - AdminService: 14 tests
# - BookingService: 16 tests
# - ReviewService: 12 tests
# - ChatService: 11 tests
# - PaymentService: 7 tests
```

### Manual API Testing
Use the included `LawyerConnect.http` file with REST Client extension in VS Code:
- 14 complete test scenarios
- User registration and authentication
- Lawyer workflows
- Booking creation
- Payment processing
- Chat and reviews

## 🔒 Security

- ✅ JWT token-based authentication
- ✅ Role-based authorization (User, Lawyer, Admin)
- ✅ BCrypt password hashing
- ✅ Input validation on all endpoints
- ✅ SQL injection protection (EF Core)
- ✅ CORS configuration
- ✅ HTTPS enforcement

## 🚀 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for detailed deployment instructions including:
- Azure App Service
- AWS Elastic Beanstalk
- Docker containers
- IIS (Windows Server)

## 📊 Database Schema

### Core Tables
- **Users** - User accounts and authentication
- **Lawyers** - Lawyer profiles and verification
- **Specializations** - Legal specializations
- **LawyerSpecializations** - Many-to-many relationship
- **LawyerPricing** - Pricing configuration
- **Bookings** - Consultation bookings
- **PaymentSessions** - Payment tracking
- **Reviews** - Lawyer reviews and ratings
- **ChatRooms** - Chat room management
- **ChatMessages** - Chat messages
- **Notifications** - User notifications
- **InteractionTypes** - Consultation types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `dotnet test`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
- Check the documentation in the `docs/` folder
- Review the API documentation: `BACKEND_DOCUMENTATION.md`
- See integration guide: `FRONTEND_INTEGRATION_GUIDE.md`
- Open an issue on GitHub

---

**Built with ❤️ using ASP.NET Core 8**
