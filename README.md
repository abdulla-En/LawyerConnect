# LawyerConnect - Legal Consultation Platform

A comprehensive legal consultation platform connecting clients with verified lawyers. Built with ASP.NET Core 8 backend and React TypeScript frontend, featuring booking management, real-time chat, payment processing, and review systems.

## 🎯 Project Status

**✅ FULL-STACK APPLICATION - PRODUCTION READY**

### Backend
- ✅ ASP.NET Core 8 Web API
- ✅ 10 Production-ready services
- ✅ JWT authentication & authorization
- ✅ Stripe payment integration (with simulated fallback)
- ✅ Real-time chat system
- ✅ Comprehensive API endpoints

### Frontend
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS + Framer Motion
- ✅ Complete user flows
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Real-time notifications

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB, Express, or Full)

### Backend Setup
```bash
# 1. Navigate to project root
cd LawyerConnect

# 2. Restore dependencies
dotnet restore

# 3. Update database connection in appsettings.json if needed
# Default: Server=.;Database=LawyerConnectDB;Trusted_Connection=True

# 4. Run the application (migrations apply automatically)
dotnet run

# Backend will run on https://localhost:5128
```

### Frontend Setup
```bash
# 1. Navigate to frontend directory
cd LawyerConnect/FrontEnd

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: https://localhost:5128
- **Swagger UI**: https://localhost:5128/swagger

## 📚 Key Features

### For Clients
- Browse and search verified lawyers by specialization
- View lawyer profiles with ratings and reviews
- Book consultations with instant confirmation
- Secure payment processing
- Real-time chat with lawyers
- Leave reviews after consultations
- Manage bookings and payment history

### For Lawyers
- Professional profile management
- Set pricing for different services
- Manage consultation bookings
- Approve/decline booking requests
- Chat with clients
- View reviews and ratings
- Track earnings

### For Admins
- Verify lawyer registrations
- Manage users and lawyers
- Monitor platform activity
- View all bookings and payments

## 🏗️ Architecture

### Tech Stack

**Backend**
- ASP.NET Core 8 Web API
- Entity Framework Core 8
- SQL Server
- JWT Bearer Authentication
- Stripe Payment Integration

**Frontend**
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Context API for state management

### Project Structure
```
LawyerConnect/
├── Controllers/          # API endpoints
├── Services/            # Business logic
├── Repositories/        # Data access
├── Models/              # Entity models
├── DTOs/                # Data transfer objects
├── Mappers/             # Entity-DTO conversions
├── Data/                # DbContext and migrations
├── Middlewares/         # Custom middleware
├── FrontEnd/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── services/    # API service layer
│   │   └── types/       # TypeScript types
│   └── public/          # Static assets
└── LawyerConnect.Tests/ # Unit tests

```

## 🔧 Configuration

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=LawyerConnectDB;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=false"
  },
  "Jwt": {
    "Key": "LawyerConnect_SuperSecure_JWT_Secret_Key_2024_Minimum_32_Characters_Long_For_HMAC_SHA256",
    "Issuer": "LawyerConnect",
    "Audience": "LawyerConnect",
    "ExpiresMinutes": 30
  },
  "Stripe": {
    "SecretKey": "YOUR_STRIPE_SECRET_KEY_HERE",
    "PublishableKey": "YOUR_STRIPE_PUBLISHABLE_KEY_HERE",
    "Currency": "usd"
  }
}
```

**Note**: Stripe keys are optional. The system will use simulated payments if real keys are not configured.

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5128/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user

### Lawyers
- `GET /api/lawyers` - Get all lawyers (paginated)
- `GET /api/lawyers/{id}` - Get lawyer profile
- `GET /api/lawyers/{id}/pricing` - Get lawyer pricing
- `POST /api/lawyers/register` - Register as lawyer
- `GET /api/lawyers/me` - Get my lawyer profile

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/lawyer` - Get lawyer bookings
- `PUT /api/bookings/{id}/status` - Update booking status

### Payments
- `POST /api/payments/create-session` - Create payment session
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/{id}` - Get payment details

### Chat
- `GET /api/chat/{bookingId}` - Get chat room
- `POST /api/chat/{bookingId}/messages` - Send message
- `GET /api/chat/{bookingId}/messages` - Get messages

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/lawyer/{lawyerId}` - Get lawyer reviews

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `GET /api/notifications/unread-count` - Get unread count

### Admin
- `GET /api/admin/lawyers/pending` - Get pending lawyers
- `PUT /api/admin/lawyers/{id}/verify` - Verify lawyer
- `PUT /api/admin/lawyers/{id}/reject` - Reject lawyer

## 🔒 Security

- JWT token-based authentication
- Role-based authorization (User, Lawyer, Admin)
- Password hashing with BCrypt
- CORS configuration
- HTTPS enforcement
- Input validation
- SQL injection protection (EF Core)
- Rate limiting middleware

## 🎨 Frontend Features

- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations with Framer Motion
- Real-time updates (polling for chat/notifications)
- Form validation
- Error handling with user feedback
- Loading states
- Optimistic UI updates

## 🚀 Deployment

### Backend Deployment
1. Publish the application: `dotnet publish -c Release`
2. Deploy to Azure App Service, AWS, or IIS
3. Configure connection strings and secrets
4. Apply migrations: `dotnet ef database update`

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - Azure Static Web Apps
   - AWS S3 + CloudFront

## 🧪 Testing

### Run Backend Tests
```bash
cd LawyerConnect
dotnet test
```

### Run Frontend (if tests exist)
```bash
cd LawyerConnect/FrontEnd
npm test
```

## 📊 Database Schema

### Core Tables
- **Users** - User accounts
- **Lawyers** - Lawyer profiles
- **Specializations** - Legal specializations
- **LawyerPricing** - Service pricing
- **Bookings** - Consultation bookings
- **PaymentSessions** - Payment tracking
- **Reviews** - Ratings and reviews
- **ChatRooms** - Chat rooms
- **ChatMessages** - Messages
- **Notifications** - User notifications
- **InteractionTypes** - Service types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ using ASP.NET Core 8 and React 18**
