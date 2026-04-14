# Frontend Integration Guide

## 🎯 Purpose
This guide helps frontend developers integrate with the LawyerConnect backend API.

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
# Start the backend API
cd LawyerConnect
dotnet run

# API will be available at:
# https://localhost:5001
# http://localhost:5000
```

### 2. Frontend Configuration
```typescript
// src/config/api.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001';
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    registerLawyer: '/api/auth/register-lawyer',
  },
  users: '/api/users',
  lawyers: '/api/lawyers',
  bookings: '/api/bookings',
  payments: '/api/payments',
  reviews: '/api/reviews',
  chat: '/api/chat',
  notifications: '/api/notifications',
  specializations: '/api/specializations',
};
```

---

## 🔐 Authentication Flow

### 1. User Registration
```typescript
// POST /api/auth/register
const registerUser = async (userData: {
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  // Returns: { token: string, user: UserResponseDto }
  
  // Store token
  localStorage.setItem('token', data.token);
  return data;
};
```

### 2. User Login
```typescript
// POST /api/auth/login
const login = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  // Returns: { token: string, user: UserResponseDto }
  
  localStorage.setItem('token', data.token);
  return data;
};
```

### 3. Authenticated Requests
```typescript
// Helper function for authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return response;
};
```

---

## 📋 Core API Endpoints

### User Management

#### Get Current User Profile
```typescript
// GET /api/users/me
const getCurrentUser = async () => {
  const response = await fetchWithAuth('/api/users/me');
  return await response.json();
  // Returns: UserResponseDto
};
```

#### Update User Profile
```typescript
// PUT /api/users/{id}
const updateUser = async (userId: number, updates: Partial<UserResponseDto>) => {
  const response = await fetchWithAuth(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return await response.json();
};
```

### Lawyer Management

#### Search Lawyers
```typescript
// GET /api/lawyers/search?specializationId=1&minRating=4&page=1&limit=10
const searchLawyers = async (filters: {
  specializationId?: number;
  minRating?: number;
  location?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, value.toString());
  });
  
  const response = await fetchWithAuth(`/api/lawyers/search?${params}`);
  return await response.json();
  // Returns: LawyerResponseDto[]
};
```

#### Get Lawyer Profile
```typescript
// GET /api/lawyers/{id}
const getLawyer = async (lawyerId: number) => {
  const response = await fetchWithAuth(`/api/lawyers/${lawyerId}`);
  return await response.json();
  // Returns: LawyerResponseDto
};
```

### Booking Management

#### Create Booking
```typescript
// POST /api/bookings
const createBooking = async (bookingData: {
  lawyerId: number;
  specializationId: number;
  interactionTypeId: number;
  date: string; // ISO 8601 format
}) => {
  const response = await fetchWithAuth('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
  return await response.json();
  // Returns: BookingResponseDto
};
```

#### Get User Bookings
```typescript
// GET /api/bookings/user?page=1&limit=10
const getUserBookings = async (page = 1, limit = 10) => {
  const response = await fetchWithAuth(`/api/bookings/user?page=${page}&limit=${limit}`);
  return await response.json();
  // Returns: BookingResponseDto[]
};
```

#### Cancel Booking
```typescript
// POST /api/bookings/{id}/cancel
const cancelBooking = async (bookingId: number) => {
  const response = await fetchWithAuth(`/api/bookings/${bookingId}/cancel`, {
    method: 'POST',
  });
  return await response.json();
};
```

### Payment Processing

#### Create Payment Session
```typescript
// POST /api/payments/create-session
const createPaymentSession = async (bookingId: number, amount: number) => {
  const response = await fetchWithAuth('/api/payments/create-session', {
    method: 'POST',
    body: JSON.stringify({ bookingId, amount }),
  });
  return await response.json();
  // Returns: { id, bookingId, amount, status, checkoutUrl }
  
  // Redirect user to Stripe checkout
  // window.location.href = data.checkoutUrl;
};
```

#### Get Payment Status
```typescript
// GET /api/payments/{sessionId}
const getPaymentStatus = async (sessionId: number) => {
  const response = await fetchWithAuth(`/api/payments/${sessionId}`);
  return await response.json();
  // Returns: PaymentSessionResponseDto
};
```

### Review System

#### Create Review
```typescript
// POST /api/reviews
const createReview = async (reviewData: {
  bookingId: number;
  lawyerId: number;
  rating: number; // 1-5
  comment?: string;
}) => {
  const response = await fetchWithAuth('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
  return await response.json();
  // Returns: ReviewResponseDto
};
```

#### Get Lawyer Reviews
```typescript
// GET /api/reviews/lawyer/{lawyerId}?page=1&limit=10
const getLawyerReviews = async (lawyerId: number, page = 1, limit = 10) => {
  const response = await fetchWithAuth(
    `/api/reviews/lawyer/${lawyerId}?page=${page}&limit=${limit}`
  );
  return await response.json();
  // Returns: ReviewResponseDto[]
};
```

### Chat System

#### Get Chat Room
```typescript
// GET /api/chat/room/{bookingId}
const getChatRoom = async (bookingId: number) => {
  const response = await fetchWithAuth(`/api/chat/room/${bookingId}`);
  return await response.json();
  // Returns: ChatRoomResponseDto
};
```

#### Send Message
```typescript
// POST /api/chat/message
const sendMessage = async (bookingId: number, message: string) => {
  const response = await fetchWithAuth('/api/chat/message', {
    method: 'POST',
    body: JSON.stringify({ bookingId, message }),
  });
  return await response.json();
  // Returns: ChatMessageResponseDto
};
```

#### Get Messages
```typescript
// GET /api/chat/messages/{bookingId}?page=1&limit=50
const getMessages = async (bookingId: number, page = 1, limit = 50) => {
  const response = await fetchWithAuth(
    `/api/chat/messages/${bookingId}?page=${page}&limit=${limit}`
  );
  return await response.json();
  // Returns: ChatMessageResponseDto[]
};
```

### Notifications

#### Get User Notifications
```typescript
// GET /api/notifications?page=1&limit=20
const getNotifications = async (page = 1, limit = 20) => {
  const response = await fetchWithAuth(`/api/notifications?page=${page}&limit=${limit}`);
  return await response.json();
  // Returns: NotificationResponseDto[]
};
```

#### Mark Notification as Read
```typescript
// PUT /api/notifications/{id}/read
const markAsRead = async (notificationId: number) => {
  const response = await fetchWithAuth(`/api/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
  return await response.json();
};
```

#### Get Unread Count
```typescript
// GET /api/notifications/unread-count
const getUnreadCount = async () => {
  const response = await fetchWithAuth('/api/notifications/unread-count');
  const data = await response.json();
  return data.count; // Returns: number
};
```

### Specializations

#### Get All Specializations
```typescript
// GET /api/specializations
const getSpecializations = async () => {
  const response = await fetchWithAuth('/api/specializations');
  return await response.json();
  // Returns: SpecializationDto[]
};
```

---

## 📦 Response DTOs

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
  user: UserResponseDto;
  lawyerId: number;
  lawyer: LawyerResponseDto;
  specializationId: number;
  interactionTypeId: number;
  date: string;
  durationMinutes: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  priceSnapshot: number;
  createdAt: string;
}
```

### ReviewResponseDto
```typescript
interface ReviewResponseDto {
  id: number;
  userId: number;
  user: UserResponseDto;
  lawyerId: number;
  bookingId: number;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}
```

### NotificationResponseDto
```typescript
interface NotificationResponseDto {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'System' | 'Booking' | 'Payment' | 'Review' | 'Message';
  isRead: boolean;
  createdAt: string;
}
```

---

## ⚠️ Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>; // Validation errors
}
```

### HTTP Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Handling Example
```typescript
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    
    switch (response.status) {
      case 400:
        // Validation error
        console.error('Validation errors:', error.errors);
        break;
      case 401:
        // Unauthorized - redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        // Forbidden
        alert('You do not have permission to perform this action');
        break;
      case 404:
        // Not found
        alert('Resource not found');
        break;
      default:
        // Server error
        alert('An error occurred. Please try again later.');
    }
    
    throw new Error(error.message);
  }
  
  return response;
};
```

---

## 🔧 Environment Variables

### Frontend (.env)
```bash
REACT_APP_API_URL=https://localhost:5001
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=LawyerConnect;..."
  },
  "Jwt": {
    "Key": "your-secret-key",
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

---

## 🧪 Testing the API

### Using LawyerConnect.http
The project includes `LawyerConnect.http` with 14 complete test scenarios. Use the REST Client extension in VS Code to test endpoints.

### Manual Testing Steps
1. Start the backend: `dotnet run`
2. Open `LawyerConnect.http` in VS Code
3. Click "Send Request" on any endpoint
4. View response in the output panel

---

## 📚 Additional Resources

- **Complete API Reference**: See `BACKEND_DOCUMENTATION.md`
- **Business Flows**: See `CORE_FLOWS_DOCUMENTATION.md`
- **Testing Examples**: See `LawyerConnect.http`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`

---

## 🆘 Common Issues

### CORS Errors
If you get CORS errors, ensure the backend `Program.cs` has:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

### SSL Certificate Errors
For development, you may need to trust the development certificate:
```bash
dotnet dev-certs https --trust
```

### Token Expiration
Tokens expire after 60 minutes. Implement token refresh or re-login flow.

---

**Ready to integrate!** 🚀
