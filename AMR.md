# Backend/Frontend Integration Guide (AMR)

**Base URL**: `http://localhost:5128/api`  
**Auth**: JWT Bearer token in `Authorization: Bearer {token}` header  
**Cookies**: `refreshToken` (HttpOnly, auto-sent)

---

## Endpoints

### Already Integrated with Frontend
- `POST /auth/register` - User registration (nested `{user: {...}}` structure)
- `POST /auth/login` - Login (returns token + sets refreshToken cookie)
- `GET /auth/me` - Get current user profile
- `GET /lawyers` - List lawyers (paginated)
- `GET /lawyers/{id}` - Get lawyer details
- `GET /lawyers/search` - Search lawyers (filters: specializationId, latitude, longitude, radiusKm, minExperienceYears, minRating)
- `PUT /users/update` - Update user profile
- `PUT /users/upload-photo` - Upload profile photo (base64)
- `DELETE /users/remove-photo` - Remove profile photo

### Waiting for Frontend Integration

**Authentication**
- `POST /auth/refresh` - Refresh access token (no body, uses cookie)
- `POST /auth/logout?logoutAllDevices=true` - Logout (single/all devices)

**Users**
- `GET /users` - List all users (Admin only, paginated)
- `PUT /users/change-password` - Change password (revokes all sessions)
- `DELETE /users/delete-account` - Delete account permanently
- `PUT /users/update-role` - Update user role (Admin only)

**Lawyers**
- `POST /lawyers/register` - Create lawyer profile (requires auth)
- `GET /lawyers/me` - Get own lawyer profile (Lawyer/Admin)
- `PUT /lawyers/{id}/verify` - Verify lawyer (Admin only)
- `POST /lawyers/{lawyerId}/pricing` - Set pricing
- `GET /lawyers/{lawyerId}/pricing` - Get all pricing for lawyer
- `GET /lawyers/{lawyerId}/pricing/{specializationId}/{interactionTypeId}` - Get specific pricing
- `PUT /lawyers/{lawyerId}/pricing` - Update pricing
- `DELETE /lawyers/{lawyerId}/pricing/{specializationId}/{interactionTypeId}` - Delete pricing

**Bookings**
- `POST /bookings` - Create booking
- `GET /bookings/{id}` - Get booking details
- `GET /bookings/user` - Get user's bookings (paginated)
- `GET /bookings/lawyer` - Get lawyer's bookings (Lawyer/Admin, paginated)
- `PUT /bookings/{id}/status` - Update booking status (Lawyer/Admin)
- `DELETE /bookings/{id}` - Cancel booking

**Payments**
- `POST /payments/create-session` - Create Stripe checkout session
- `POST /payments/confirm` - Confirm payment
- `GET /payments/{id}` - Get payment session
- `GET /payments/user` - Get user's payment sessions (paginated)
- `POST /payments/refund` - Refund payment (Admin only)
- `POST /payments/webhook/{provider}` - Stripe webhook (public)

**Reviews**
- `POST /reviews` - Create review
- `GET /reviews/lawyer/{lawyerId}` - Get lawyer reviews (paginated)
- `GET /reviews/lawyer/{lawyerId}/rating` - Get lawyer average rating
- `DELETE /reviews/{id}` - Delete review (Admin only)

**Chat**
- `GET /chat/{bookingId}` - Get chat room
- `POST /chat/{bookingId}/messages` - Send message (body: string)
- `GET /chat/{bookingId}/messages` - Get messages (paginated, limit=50)
- `DELETE /chat/{bookingId}` - Archive chat

**Notifications**
- `GET /notifications` - Get user notifications (paginated, limit=20)
- `GET /notifications/unread-count` - Get unread count
- `PUT /notifications/{id}/read` - Mark as read
- `PUT /notifications/mark-all-read` - Mark all as read
- `DELETE /notifications/{id}` - Delete notification

**Specializations**
- `GET /specializations` - Get all specializations
- `GET /specializations/{id}` - Get specialization by ID
- `POST /specializations` - Create specialization (Admin only)
- `PUT /specializations/{id}` - Update specialization (Admin only)
- `DELETE /specializations/{id}` - Delete specialization (Admin only)

**Admin**
- `GET /admin/users` - Get all users (paginated, limit=20)
- `GET /admin/lawyers/pending` - Get pending lawyers (paginated)
- `PUT /admin/lawyers/{id}/verify` - Verify lawyer
- `PUT /admin/lawyers/{id}/reject` - Reject lawyer (body: `{reason: string}`)
- `PUT /admin/users/{id}/suspend` - Suspend user
- `PUT /admin/users/{id}/unsuspend` - Unsuspend user
- `GET /admin/bookings` - Get all bookings (paginated)
- `GET /admin/payments` - Get all payments (paginated)

---

## New Features Overview

**Advanced Authentication**
- Refresh token rotation (auto-rotates on `/auth/refresh`)
- Replay attack detection (revokes all sessions if old token reused)
- Multi-device logout support
- Session management with audit trail

**Lawyer System**
- Lawyer profile creation with specializations
- Pricing tiers per specialization/interaction type
- Verification workflow (Admin approval)
- Search with filters (location, rating, experience)
- Average rating calculation

**Booking System**
- Create bookings with price snapshots
- Status management (Pending → Confirmed → Completed → Cancelled)
- Conflict detection
- Auto-creates chat room per booking

**Payment Integration**
- Stripe checkout session creation
- Webhook handling for async payment confirmation
- Refund processing
- Payment history

**Review System**
- Create reviews (1-5 stars)
- Auto-updates lawyer average rating
- One review per booking constraint

**Real-time Chat**
- Chat rooms per booking
- Message history with pagination
- Archive support

**Notification System**
- Multiple types (Booking, Payment, System, Message)
- Read/unread tracking
- Bulk mark as read

**Admin Panel**
- User management (suspend/unsuspend)
- Lawyer verification workflow
- System-wide data access

---

## Frontend Integration Guide

### 1. Authentication Flow

**Registration** (nested structure required):
```javascript
POST /auth/register
{
  "user": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "phone": "+1234567890",
    "city": "New York",
    "role": "User" // or "Lawyer"
  }
}
```

**Login** (sets refreshToken cookie):
```javascript
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
// Response: { token, expiresAt, user, refreshToken, refreshTokenExpires }
// Cookie: refreshToken (HttpOnly)
```

**Token Refresh** (before expiry):
```javascript
POST /auth/refresh
// No body needed, uses refreshToken cookie
// Must include: credentials: 'include' or withCredentials: true
```

**Logout**:
```javascript
POST /auth/logout?logoutAllDevices=false
Authorization: Bearer {token}
// Clears refreshToken cookie
```

### 2. Axios Configuration

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5128/api',
  withCredentials: true, // CRITICAL: Sends cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('token', data.token);
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return api(error.config);
      } catch (refreshError) {
        // Redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

### 3. Pagination Pattern

All list endpoints support:
```javascript
GET /endpoint?page=1&limit=10
// page: 1-indexed (default: 1)
// limit: 1-100 (default: 10)
```

### 4. Role-Based Access

**Roles**: `User`, `Lawyer`, `Admin`

**Check role**:
```javascript
const user = await api.get('/auth/me');
if (user.data.role === 'Admin') {
  // Show admin features
}
```

### 5. Stripe Payment Flow

```javascript
// 1. Create checkout session
const { data } = await api.post('/payments/create-session', {
  bookingId: 123,
  amount: 150.00
});

// 2. Redirect to Stripe
window.location.href = data.checkoutUrl;

// 3. Stripe redirects back to your success URL
// 4. Webhook auto-confirms payment (or manually call /payments/confirm)
```

### 6. Chat Integration

```javascript
// Get chat room
const { data: chatRoom } = await api.get(`/chat/${bookingId}`);

// Send message (body is plain string)
await api.post(`/chat/${bookingId}/messages`, "Hello!");

// Get messages
const { data: messages } = await api.get(`/chat/${bookingId}/messages?page=1&limit=50`);
```

### 7. Lawyer Search

```javascript
const { data: lawyers } = await api.get('/lawyers/search', {
  params: {
    specializationId: 1,
    latitude: 40.7128,
    longitude: -74.0060,
    radiusKm: 50,
    minExperienceYears: 5,
    minRating: 4.0,
    page: 1,
    limit: 10
  }
});
```

---

## Tricky Scenarios / Edge Cases

### 1. Registration Structure Mismatch
**Issue**: Registration expects nested `{user: {...}}` structure  
**Error**: `"JSON deserialization was missing required properties: user"`  
**Fix**: Always wrap user data in `user` object

### 2. Refresh Token Not Sent
**Issue**: `/auth/refresh` returns 401  
**Error**: `"Refresh token not found"`  
**Fix**: Ensure `withCredentials: true` in axios config

### 3. Token Expiry Handling
**Issue**: Token expires (30 min default)  
**Fix**: Implement auto-refresh interceptor (see Axios config above)

### 4. Replay Attack Detection
**Issue**: Using old refresh token revokes ALL sessions  
**Behavior**: If backend detects replay, all user tokens are revoked  
**Fix**: Never cache/reuse old refresh tokens, always use latest from cookie

### 5. Password Change Side Effect
**Issue**: Changing password logs out all devices  
**Behavior**: `/users/change-password` revokes all refresh tokens  
**Fix**: Show warning before password change, redirect to login after

### 6. Chat Message Format
**Issue**: Chat endpoint expects plain string, not JSON object  
**Wrong**: `{message: "Hello"}`  
**Correct**: `"Hello"` (raw string in body)

### 7. Pagination Validation
**Issue**: Invalid page/limit values  
**Behavior**: Backend auto-corrects (page < 1 → 1, limit > 100 → 10)  
**Fix**: Validate on frontend before sending

### 8. Booking Status Transitions
**Issue**: Invalid status changes  
**Valid Flow**: `Pending → Confirmed → Completed` or `Pending → Cancelled`  
**Invalid**: `Completed → Pending` (will fail)

### 9. Review Constraints
**Issue**: Duplicate review for same booking  
**Error**: `"Review already exists for this booking"`  
**Fix**: Check if review exists before showing review form

### 10. Lawyer Pricing Composite Key
**Issue**: Pricing identified by 3 fields (lawyerId, specializationId, interactionTypeId)  
**Fix**: Always include all 3 when updating/deleting pricing

### 11. Admin Secret for Admin Registration
**Issue**: Registering as Admin requires secret  
**Fix**: Include `adminSecret` field in user object (from backend config)

### 12. CORS Credentials
**Issue**: Cookies not sent cross-origin  
**Fix**: Backend already configured for `http://localhost:5173`, ensure frontend uses `withCredentials: true`

### 13. Stripe Webhook Signature
**Issue**: Webhook validation may fail in development  
**Fix**: Use Stripe CLI for local testing or disable signature validation in dev

### 14. Booking Price Snapshot
**Issue**: Price changes after booking created  
**Behavior**: Booking stores `priceSnapshot` at creation time  
**Fix**: Display snapshot price, not current lawyer price

### 15. Notification Ownership
**Issue**: Trying to mark another user's notification as read  
**Error**: 403 Forbidden  
**Fix**: Backend validates notification belongs to current user

---

## Error Response Format

All errors follow this structure:
```javascript
{
  "message": "Error description",
  "errors": { /* validation errors */ }
}
```

**Common Status Codes**:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email, existing review, etc.)
- `500` - Internal Server Error

---

## Quick Start Checklist

- [ ] Configure axios with `withCredentials: true`
- [ ] Implement token refresh interceptor
- [ ] Use nested `{user: {...}}` for registration
- [ ] Store token in localStorage, not cookies (backend handles refreshToken cookie)
- [ ] Handle 401 errors with auto-refresh
- [ ] Show warning before password change (logs out all devices)
- [ ] Validate pagination params (page ≥ 1, limit ≤ 100)
- [ ] Use plain string for chat messages, not JSON
- [ ] Check user role before showing admin/lawyer features
- [ ] Display booking `priceSnapshot`, not current lawyer price

---

**Last Updated**: April 14, 2026  
**Backend Version**: v2.0 (with refresh tokens, reviews, chat, notifications)
