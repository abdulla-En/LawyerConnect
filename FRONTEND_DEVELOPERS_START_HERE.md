# 🚀 Frontend Developers - Start Here!

## Welcome!
This guide tells you exactly what you need to integrate the frontend with the LawyerConnect backend.

---

## 📚 Essential Documents (Read in This Order)

### 1. **FRONTEND_INTEGRATION_GUIDE.md** ⭐ START HERE
**What it contains**:
- API base URL configuration
- Authentication flow (login/register)
- All API endpoints with code examples
- Request/response formats
- Error handling
- TypeScript interfaces

**Why you need it**: This is your main integration guide with copy-paste code examples.

### 2. **BACKEND_DOCUMENTATION.md** 📖 REFERENCE
**What it contains**:
- Complete API reference
- All endpoints documented
- Request/response examples
- Authentication requirements
- Error codes

**Why you need it**: Detailed API reference when you need more information.

### 3. **CORE_FLOWS_DOCUMENTATION.md** 🔄 BUSINESS LOGIC
**What it contains**:
- User registration flow
- Lawyer registration flow
- Booking creation process
- Payment workflow
- Chat system flow
- Review system flow

**Why you need it**: Understand the business logic and user journeys.

### 4. **LawyerConnect.http** 🧪 TESTING
**What it contains**:
- 14 complete API test scenarios
- Real request examples
- Expected responses

**Why you need it**: Test the API manually and see real examples.

---

## 🎯 Quick Start Checklist

### Step 1: Backend Setup
```bash
# 1. Make sure backend is running
cd LawyerConnect
dotnet run

# Backend will be at:
# https://localhost:5001
# http://localhost:5000
```

### Step 2: Frontend Configuration
```typescript
// Create src/config/api.ts
export const API_BASE_URL = 'https://localhost:5001';
```

### Step 3: Test Connection
```typescript
// Test if backend is accessible
fetch(`${API_BASE_URL}/api/specializations`)
  .then(res => res.json())
  .then(data => console.log('Backend connected!', data))
  .catch(err => console.error('Backend not accessible', err));
```

---

## 🔐 Authentication Flow (Quick Reference)

### 1. User Registration
```typescript
POST /api/auth/register
Body: {
  fullName: string,
  email: string,
  passwordHash: string,
  phone: string
}
Response: {
  token: string,
  user: UserResponseDto
}
```

### 2. User Login
```typescript
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  token: string,
  user: UserResponseDto
}
```

### 3. Authenticated Requests
```typescript
// Add token to all requests
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 📡 Most Important API Endpoints

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/{id}` - Update user profile

### Lawyer Search
- `GET /api/lawyers/search?specializationId=1&minRating=4` - Search lawyers
- `GET /api/lawyers/{id}` - Get lawyer profile

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `POST /api/bookings/{id}/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-session` - Create Stripe payment
- `GET /api/payments/{sessionId}` - Get payment status

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/lawyer/{lawyerId}` - Get lawyer reviews

### Chat
- `GET /api/chat/room/{bookingId}` - Get chat room
- `POST /api/chat/message` - Send message
- `GET /api/chat/messages/{bookingId}` - Get messages

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `GET /api/notifications/unread-count` - Get unread count

---

## 🔧 Environment Setup

### Frontend .env
```bash
REACT_APP_API_URL=https://localhost:5001
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### CORS Configuration
The backend is already configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

If you use a different port, let the backend team know!

---

## 📦 TypeScript Interfaces

### UserResponseDto
```typescript
interface UserResponseDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: 'User' | 'Lawyer' | 'Admin';
  createdAt: string;
}
```

### LawyerResponseDto
```typescript
interface LawyerResponseDto {
  id: number;
  userId: number;
  user: UserResponseDto;
  specializations: SpecializationDto[];
  experienceYears: number;
  address: string;
  isVerified: boolean;
  averageRating: number;
  reviewsCount: number;
  pricing: LawyerPricingDto[];
}
```

### BookingResponseDto
```typescript
interface BookingResponseDto {
  id: number;
  userId: number;
  lawyerId: number;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  priceSnapshot: number;
}
```

**See FRONTEND_INTEGRATION_GUIDE.md for complete interface definitions!**

---

## ⚠️ Common Issues & Solutions

### Issue 1: CORS Error
**Error**: "Access to fetch has been blocked by CORS policy"
**Solution**: Make sure backend is running and CORS is configured for your frontend URL

### Issue 2: 401 Unauthorized
**Error**: API returns 401
**Solution**: Check that you're sending the JWT token in Authorization header

### Issue 3: SSL Certificate Error
**Error**: "NET::ERR_CERT_AUTHORITY_INVALID"
**Solution**: Trust the development certificate:
```bash
dotnet dev-certs https --trust
```

### Issue 4: Token Expired
**Error**: 401 after some time
**Solution**: Tokens expire after 60 minutes. Implement re-login flow.

---

## 🧪 Testing the API

### Option 1: Use LawyerConnect.http
1. Open `LawyerConnect.http` in VS Code
2. Install REST Client extension
3. Click "Send Request" on any endpoint
4. See the response

### Option 2: Use Postman
1. Import the Postman collection: `LawyerConnect.postman_collection.json`
2. Set base URL to `https://localhost:5001`
3. Test endpoints

### Option 3: Use Browser/Fetch
```typescript
// Test in browser console
fetch('https://localhost:5001/api/specializations')
  .then(r => r.json())
  .then(console.log);
```

---

## 📞 Need Help?

### For API Questions
- Check **FRONTEND_INTEGRATION_GUIDE.md** (detailed examples)
- Check **BACKEND_DOCUMENTATION.md** (complete reference)
- Test with **LawyerConnect.http** (working examples)

### For Business Logic Questions
- Check **CORE_FLOWS_DOCUMENTATION.md** (user journeys)
- Check **IMPLEMENTATION_SUMMARY.md** (what was built)

### For Deployment Questions
- Check **DEPLOYMENT_GUIDE.md** (production setup)

---

## ✅ Integration Checklist

Before you start coding:
- [ ] Backend is running (`dotnet run`)
- [ ] You can access https://localhost:5001/swagger
- [ ] You've read FRONTEND_INTEGRATION_GUIDE.md
- [ ] You've tested an API endpoint (e.g., GET /api/specializations)
- [ ] You understand the authentication flow
- [ ] You have the TypeScript interfaces

During development:
- [ ] Store JWT token in localStorage
- [ ] Add Authorization header to all authenticated requests
- [ ] Handle 401 errors (token expired)
- [ ] Handle 400 errors (validation errors)
- [ ] Test with real API calls, not mocked data

---

## 🎉 You're Ready!

**Everything you need is in these 4 files**:
1. **FRONTEND_INTEGRATION_GUIDE.md** - Your main guide
2. **BACKEND_DOCUMENTATION.md** - Complete API reference
3. **CORE_FLOWS_DOCUMENTATION.md** - Business logic
4. **LawyerConnect.http** - Testing examples

**Start with FRONTEND_INTEGRATION_GUIDE.md and you'll be up and running in no time!** 🚀

---

**Questions?** Check the documentation first, then ask the backend team!
