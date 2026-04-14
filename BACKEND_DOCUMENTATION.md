# LawyerConnect Backend - Complete Documentation

## Overview

ASP.NET Core 8 Web API for user registration/login, lawyer onboarding, bookings, and payment sessions. Uses SQL Server with Entity Framework Core, JWT authentication/authorization with refresh tokens, token rotation, replay attack detection, and a custom rate limiter.

---

## Tech Stack

- **.NET 8** - Latest LTS framework
- **ASP.NET Core Web API** - RESTful API framework
- **Entity Framework Core 8** - ORM with SQL Server
- **SQL Server** - Relational database
- **JWT Bearer Authentication** - HMAC SHA256 token signing
- **Swagger/OpenAPI** - API documentation
- **Role-based Access Control** - User, Lawyer, Admin roles
- **Custom Middleware** - Per-route rate limiting
- **Background Services** - Token cleanup job

---

## Project Layout

```
LawyerConnect/
├── Program.cs                          # DI setup, EF Core, JWT, Swagger, middleware
├── appsettings.json                    # Configuration (DB, JWT, Admin secret, rate limiting)
├── appsettings.Development.json        # Development overrides
├── LawyerConnect.csproj                # Project file
├── LawyerConnect.sln                   # Solution file
│
├── Data/
│   └── LawyerConnectDbContext.cs       # EF Core DbContext with all DbSets
│
├── Models/
│   ├── User.cs                         # User entity
│   ├── Lawyer.cs                       # Lawyer profile entity
│   ├── Booking.cs                      # Booking entity
│   ├── PaymentSession.cs               # Payment session entity
│   ├── RefreshToken.cs                 # Refresh token entity (NEW)
│   └── RefreshTokenRevokeReason.cs     # Enum for token revocation reasons (NEW)
│
├── DTOs/
│   ├── AuthResponseDto.cs              # Auth response (token + user)
│   ├── LoginDto.cs                     # Login request
│   ├── UserRegisterDto.cs              # User registration request
│   ├── UserResponseDto.cs              # User response
│   ├── LawyerRegisterDto.cs            # Lawyer registration request
│   ├── LawyerResponseDto.cs            # Lawyer response
│   ├── BookingDto.cs                   # Booking request
│   ├── BookingResponseDto.cs           # Booking response
│   ├── PaymentDto.cs                   # Payment request
│   └── PaymentSessionResponseDto.cs    # Payment session response
│
├── Mappers/
│   └── MappingExtensions.cs            # Extension methods for DTO mapping
│
├── Repositories/
│   ├── IUserRepository.cs              # User data access interface
│   ├── UserRepository.cs               # User data access implementation
│   ├── ILawyerRepository.cs            # Lawyer data access interface
│   ├── LawyerRepository.cs             # Lawyer data access implementation
│   ├── IBookingRepository.cs           # Booking data access interface
│   ├── BookingRepository.cs            # Booking data access implementation
│   ├── IPaymentSessionRepository.cs    # Payment session data access interface
│   ├── PaymentSessionRepository.cs     # Payment session data access implementation
│   ├── IRefreshTokenRepository.cs      # Refresh token data access interface (NEW)
│   └── RefreshTokenRepository.cs       # Refresh token data access implementation (NEW)
│
├── Services/
│   ├── IUserService.cs                 # User business logic interface
│   ├── UserService.cs                  # User business logic implementation
│   ├── ILawyerService.cs               # Lawyer business logic interface
│   ├── LawyerService.cs                # Lawyer business logic implementation
│   ├── IBookingService.cs              # Booking business logic interface
│   ├── BookingService.cs               # Booking business logic implementation
│   ├── IPaymentService.cs              # Payment business logic interface
│   ├── PaymentService.cs               # Payment business logic implementation
│   └── TokenCleanupService.cs          # Background service for token cleanup (NEW)
│
├── Controllers/
│   ├── AuthController.cs               # Authentication endpoints (register, login, refresh, logout, me)
│   ├── UsersController.cs              # User management endpoints (update, delete-account, change-password)
│   ├── LawyersController.cs            # Lawyer management endpoints
│   ├── BookingsController.cs           # Booking management endpoints
│   └── PaymentsController.cs           # Payment management endpoints
│
├── Middlewares/
│   └── RateLimitingMiddleware.cs       # Per-IP+path rate limiting
│
└── Migrations/
    ├── 20260204155026_newMigration.cs  # Initial migration with RefreshToken table
    └── LawyerConnectDbContextModelSnapshot.cs
```

---

## Configuration

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=LawyerConnectDB;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=false"
  },
  "Jwt": {
    "Key": "LawyerConnect_SuperSecure_JWT_Secret_Key_2024_Minimum_32_Characters_Long_For_HMAC_SHA256",
    "Issuer": "LawyerConnect",
    "Audience": "LawyerConnect",
    "ExpiresMinutes": 30,
    "RefreshTokenExpirationDays": 7,
    "TokenCleanupDaysOld": 14,
    "TokenCleanupIntervalHours": 10
  },
  "RateLimiting": {
    "Limit": 5,
    "WindowSeconds": 60
  },
  "AdminSecret": "LawyerConnect_Admin_Registration_Secret_2024"
}
```

### Environment Variables (Production)

```bash
# Database
ConnectionStrings__DefaultConnection=Server=prod-server;Database=LawyerConnectDB;User Id=sa;Password=...

# JWT
Jwt__Key=your-production-secret-key-minimum-32-characters
Jwt__Issuer=LawyerConnect
Jwt__Audience=LawyerConnect
Jwt__ExpiresMinutes=30
Jwt__RefreshTokenExpirationDays=7
Jwt__TokenCleanupDaysOld=14
Jwt__TokenCleanupIntervalHours=10

# Admin
AdminSecret=your-production-admin-secret

# Rate Limiting
RateLimiting__Limit=10
RateLimiting__WindowSeconds=60
```

---

## Running Locally (Step by Step)

### Prerequisites
- .NET 8 SDK installed
- SQL Server instance running and accessible
- Visual Studio Code or Visual Studio 2022 (optional)

### Steps

1. **Restore packages:**
   ```bash
   dotnet restore
   ```

2. **Configure environment:**
   - Update `appsettings.json` with your SQL Server connection string
   - Or set environment variables:
     ```bash
     set ConnectionStrings__DefaultConnection=Server=.;Database=LawyerConnectDB;...
     ```

3. **Create database:**
   ```bash
   dotnet ef database update
   ```
   This applies all migrations and creates the database schema.

4. **Start API:**
   ```bash
   dotnet run
   ```
   API starts at `https://localhost:5001` (HTTPS) or `http://localhost:5000` (HTTP)

5. **Explore Swagger:**
   - Open browser: `https://localhost:5001/swagger`
   - View all endpoints and test them interactively

6. **Call APIs:**
   - Use Postman, curl, or Swagger UI
   - Include `Authorization: Bearer <token>` header for protected routes

---

## API Surface (Complete)

### Authentication Endpoints

#### 1. **POST /api/auth/register**
Register a new user
```
Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe",
  "role": "User" // or "Lawyer" (Admin requires AdminSecret)
}

Response (201 Created):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-02-06T14:30:00Z",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "User"
  }
}

Cookies Set:
- refreshToken (HttpOnly, Secure, SameSite=Lax, 7 days)
```

#### 2. **POST /api/auth/login**
Login user and get tokens
```
Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-02-06T14:30:00Z",
  "user": { ... }
}

Cookies Set:
- refreshToken (HttpOnly, Secure, SameSite=Lax, 7 days)

Logging:
- Success: "User {userId} ({email}) logged in successfully from IP {ipAddress}"
- Failure: "Login attempt failed: User not found" or "Invalid password"
```

#### 3. **POST /api/auth/refresh** ⭐ NEW
Refresh access token using refresh token
```
Request:
- No body required
- Refresh token automatically sent in cookies

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-02-06T14:30:00Z",
  "user": { ... }
}

Cookies Updated:
- refreshToken (rotated - new token issued)

Behavior:
- Token Rotation: Old refresh token revoked, new one issued
- Sliding Expiration: If < 3 days until expiry, extends to 7 days
- Replay Detection: If old token used, ALL user tokens revoked

Logging:
- Success: "User {userId} token refreshed successfully"
- Replay Attack: "SECURITY ALERT: Replay attack detected for user {userId}. All sessions revoked."
- Expired: "Refresh attempt failed: Token expired for user {userId}"
```

#### 4. **POST /api/auth/logout** ⭐ NEW
Logout user and revoke tokens
```
Request:
- Authorization: Bearer {accessToken}
- Query param (optional): ?logoutAllDevices=true

Response (200 OK):
{
  "message": "Logged out successfully."
  // or "Logged out from all devices."
}

Cookies Cleared:
- refreshToken deleted

Behavior:
- Single Device: Only current refresh token revoked (reason: Logout)
- All Devices: All user's refresh tokens revoked (reason: LogoutAll)

Logging:
- "User {userId} logged out from current device"
- "User {userId} logged out from all devices"
```

#### 5. **GET /api/auth/me**
Get current user info
```
Request:
- Authorization: Bearer {accessToken}

Response (200 OK):
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "User",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### User Management Endpoints

#### 6. **GET /api/users**
Get paged list of users (Admin only)
```
Request:
- Authorization: Bearer {accessToken}
- Query: ?page=1&limit=10

Response (200 OK):
[
  {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "User"
  },
  ...
]
```

#### 7. **PUT /api/users/update**
Update own profile
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "fullName": "Jane Doe",
    "phone": "+1234567890",
    "city": "New York"
  }

Response (204 No Content)
```

#### 8. **PUT /api/users/change-password** ⭐ UPDATED
Change password (revokes all tokens)
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "currentPassword": "OldPassword123",
    "newPassword": "NewPassword123"
  }

Response (200 OK):
{
  "message": "Password changed successfully. Please login again."
}

Behavior:
- ALL refresh tokens revoked (reason: PasswordChanged)
- User must login again on all devices

Logging:
- "User {userId} changed password. All sessions revoked."
```

#### 9. **DELETE /api/users/delete-account** ⭐ NEW
Delete user account permanently
```
Request:
- Authorization: Bearer {accessToken}

Response (200 OK):
{
  "message": "Account deleted successfully."
}

Cookies Cleared:
- refreshToken deleted

Behavior:
- ALL refresh tokens revoked (reason: AccountDeleted)
- User account permanently deleted
- All related data deleted (cascade)

Logging:
- "User {userId} account deleted"
```

#### 10. **PUT /api/users/update-role**
Update user role (Admin only)
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "userId": 5,
    "role": "Lawyer"
  }

Response (204 No Content)
```

#### 11. **PUT /api/users/upload-photo**
Upload profile photo
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "photoBase64": "data:image/jpeg;base64,..."
  }

Response (200 OK):
{
  "profilePhoto": "data:image/jpeg;base64,..."
}
```

#### 12. **DELETE /api/users/remove-photo**
Remove profile photo
```
Request:
- Authorization: Bearer {accessToken}

Response (204 No Content)
```

### Lawyer Management Endpoints

#### 13. **POST /api/lawyers/register**
Create lawyer profile for current user
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "specialization": "Criminal Law",
    "yearsOfExperience": 10,
    "bio": "Experienced criminal lawyer",
    "hourlyRate": 150.00,
    "latitude": 40.7128,
    "longitude": -74.0060
  }

Response (201 Created):
{
  "id": 1,
  "userId": 1,
  "specialization": "Criminal Law",
  "yearsOfExperience": 10,
  "bio": "Experienced criminal lawyer",
  "hourlyRate": 150.00,
  "isVerified": false,
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### 14. **GET /api/lawyers**
Get paged list of lawyers (public)
```
Request:
- Query: ?page=1&limit=10

Response (200 OK):
[
  {
    "id": 1,
    "userId": 1,
    "specialization": "Criminal Law",
    "yearsOfExperience": 10,
    "hourlyRate": 150.00,
    "isVerified": true
  },
  ...
]
```

#### 15. **GET /api/lawyers/{id}**
Get lawyer details (public)
```
Request:
- Path: /api/lawyers/1

Response (200 OK):
{
  "id": 1,
  "userId": 1,
  "specialization": "Criminal Law",
  "yearsOfExperience": 10,
  "bio": "Experienced criminal lawyer",
  "hourlyRate": 150.00,
  "isVerified": true,
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### 16. **GET /api/lawyers/me**
Get current lawyer profile (Lawyer/Admin)
```
Request:
- Authorization: Bearer {accessToken}

Response (200 OK):
{
  "id": 1,
  "userId": 1,
  "specialization": "Criminal Law",
  "yearsOfExperience": 10,
  "bio": "Experienced criminal lawyer",
  "hourlyRate": 150.00,
  "isVerified": false,
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### 17. **PUT /api/lawyers/{id}/verify**
Verify lawyer (Admin only)
```
Request:
- Authorization: Bearer {accessToken}
- Path: /api/lawyers/1

Response (204 No Content)
```

### Booking Endpoints

#### 18. **POST /api/bookings**
Create booking
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "lawyerId": 1,
    "bookingDate": "2024-02-15T10:00:00Z",
    "description": "Need legal consultation"
  }

Response (201 Created):
{
  "id": 1,
  "userId": 1,
  "lawyerId": 1,
  "bookingDate": "2024-02-15T10:00:00Z",
  "description": "Need legal consultation",
  "status": "Pending",
  "createdAt": "2024-02-06T10:00:00Z"
}
```

#### 19. **GET /api/bookings/{id}**
Get booking by ID
```
Request:
- Authorization: Bearer {accessToken}
- Path: /api/bookings/1

Response (200 OK):
{
  "id": 1,
  "userId": 1,
  "lawyerId": 1,
  "bookingDate": "2024-02-15T10:00:00Z",
  "description": "Need legal consultation",
  "status": "Pending",
  "createdAt": "2024-02-06T10:00:00Z"
}
```

#### 20. **GET /api/bookings/user**
Get current user's bookings
```
Request:
- Authorization: Bearer {accessToken}
- Query: ?page=1&limit=10

Response (200 OK):
[
  {
    "id": 1,
    "userId": 1,
    "lawyerId": 1,
    "bookingDate": "2024-02-15T10:00:00Z",
    "status": "Pending"
  },
  ...
]
```

#### 21. **GET /api/bookings/lawyer**
Get bookings for lawyer (Lawyer/Admin)
```
Request:
- Authorization: Bearer {accessToken}
- Query: ?page=1&limit=10&lawyerId=1 (admin can specify lawyerId)

Response (200 OK):
[
  {
    "id": 1,
    "userId": 1,
    "lawyerId": 1,
    "bookingDate": "2024-02-15T10:00:00Z",
    "status": "Pending"
  },
  ...
]
```

#### 22. **PUT /api/bookings/{id}/status**
Update booking status (Admin/Lawyer)
```
Request:
- Authorization: Bearer {accessToken}
- Path: /api/bookings/1
- Body: {
    "status": "Confirmed" // or "Completed", "Cancelled"
  }

Response (204 No Content)
```

### Payment Endpoints

#### 23. **POST /api/payments/create-session**
Create payment session for booking
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "bookingId": 1,
    "amount": 150.00
  }

Response (201 Created):
{
  "id": 1,
  "bookingId": 1,
  "amount": 150.00,
  "status": "Pending",
  "createdAt": "2024-02-06T10:00:00Z"
}
```

#### 24. **POST /api/payments/confirm**
Mark payment session as paid
```
Request:
- Authorization: Bearer {accessToken}
- Body: {
    "sessionId": 1
  }

Response (200 OK):
{
  "id": 1,
  "bookingId": 1,
  "amount": 150.00,
  "status": "Paid",
  "paidAt": "2024-02-06T10:05:00Z"
}
```

---

## Authentication & Authorization

### How It Works

1. **User Registration/Login:**
   - User provides email and password
   - Password hashed with SHA256 (should upgrade to bcrypt)
   - JWT token issued with claims: `sub` (user id), `email`, `role`
   - Refresh token generated and stored in HttpOnly cookie

2. **Token Validation:**
   - JWT validated via JwtBearer middleware in Program.cs
   - Claims extracted: user id, email, role
   - `[Authorize]` attribute requires valid token
   - `[Authorize(Roles = "Admin")]` requires specific role

3. **Token Refresh:**
   - Access token expires in 30 minutes
   - Frontend calls `/api/auth/refresh` before expiration
   - Backend validates refresh token from cookie
   - New access token + rotated refresh token issued
   - Old refresh token revoked

4. **Replay Attack Detection:**
   - If old/revoked refresh token used, ALL user tokens revoked
   - User must login again
   - Security alert logged

5. **Logout:**
   - Single device: Current refresh token revoked
   - All devices: All user's refresh tokens revoked
   - Refresh token cookie cleared

### Role-Based Access

| Role | Permissions |
|------|-------------|
| **User** | Register, login, update profile, create bookings, upload photo |
| **Lawyer** | Register as lawyer, view own bookings, update booking status |
| **Admin** | All user permissions + manage users, verify lawyers, view all bookings |

---

## Rate Limiting

### How It Works

- **Middleware:** `RateLimitingMiddleware.cs` tracks requests per IP+path
- **Window:** Sliding window (default: 5 requests per 60 seconds)
- **Response:** Returns 429 Too Many Requests with headers:
  - `X-RateLimit-Limit`: Max requests
  - `X-RateLimit-Remaining`: Requests left
  - `X-RateLimit-Reset`: Window reset time

### Configuration

```json
"RateLimiting": {
  "Limit": 5,
  "WindowSeconds": 60
}
```

### Production Recommendations

- Increase limit for high-traffic endpoints
- Use distributed cache (Redis) for multi-server deployments
- Implement per-user rate limiting for authenticated endpoints

---

## Database Model

### Entities & Relationships

```
User (1) ──── (1) Lawyer
  │
  ├─── (1) ──── (∞) Booking ──── (1) PaymentSession
  │
  └─── (∞) RefreshToken

Constraints:
- User.Email: UNIQUE
- Lawyer.UserId: UNIQUE (one-to-one)
- Booking.UserId + Booking.LawyerId: Foreign keys with restricted deletes
- PaymentSession.BookingId: UNIQUE (one-to-one)
- RefreshToken.TokenHash: UNIQUE
- RefreshToken.UserId: Foreign key
```

### RefreshToken Table (NEW)

```sql
CREATE TABLE RefreshTokens (
  Id UNIQUEIDENTIFIER PRIMARY KEY,
  UserId INT NOT NULL,
  TokenHash NVARCHAR(MAX) NOT NULL UNIQUE,
  ExpiresAt DATETIME2 NOT NULL,
  Revoked BIT NOT NULL DEFAULT 0,
  CreatedAt DATETIME2 NOT NULL,
  RevokedDate DATETIME2 NULL,
  RevokeReason INT NULL, -- Enum: 0=Logout, 1=LogoutAll, 2=Rotation, 3=ReplayDetected, 4=PasswordChanged, 5=AccountDeleted, 6=AdminForceLogout
  ReplacedByTokenId UNIQUEIDENTIFIER NULL,
  IpAddress NVARCHAR(45) NULL,
  UserAgent NVARCHAR(MAX) NULL,
  FOREIGN KEY (UserId) REFERENCES Users(Id),
  FOREIGN KEY (ReplacedByTokenId) REFERENCES RefreshTokens(Id)
);

CREATE INDEX IX_RefreshTokens_UserId ON RefreshTokens(UserId);
CREATE INDEX IX_RefreshTokens_TokenHash ON RefreshTokens(TokenHash) UNIQUE;
CREATE INDEX IX_RefreshTokens_RevokedDate ON RefreshTokens(RevokedDate);
```

---

## Useful Commands

```bash
# Restore dependencies
dotnet restore

# Create migration after model changes
dotnet ef migrations add AddNewFeature

# Apply migrations to database
dotnet ef database update

# Revert last migration
dotnet ef migrations remove

# View migration history
dotnet ef migrations list

# Start API
dotnet run

# Start with specific configuration
dotnet run --configuration Release

# Build project
dotnet build

# Publish for deployment
dotnet publish -c Release -o ./publish
```

---

## Development Tips

### Swagger UI
- Access at `/swagger` in Development environment
- Test endpoints interactively
- View request/response schemas
- Copy curl commands

### Environment Variables
- Use for secrets in non-dev environments
- Never commit secrets to version control
- Example: `set Jwt__Key=your-secret-key`

### Logging
- Configured in `appsettings.json`
- Log levels: Information, Warning, Error
- Auth events logged: login attempts, token refresh, logout, password change
- Security alerts logged: replay attacks, failed logins

### Performance Optimization
- Use async/await throughout
- Implement pagination for list endpoints
- Add database indexes for frequently queried columns
- Consider caching for lawyer list

### Security Best Practices
- Use HTTPS in production
- Rotate JWT secret regularly
- Implement rate limiting per user (not just IP)
- Use bcrypt for password hashing (upgrade from SHA256)
- Validate all inputs
- Implement CORS properly
- Use environment variables for secrets

---

## Deployment Checklist

- [ ] Update `appsettings.Production.json` with production values
- [ ] Set environment variables for secrets
- [ ] Enable HTTPS with valid certificate
- [ ] Configure CORS for frontend domain
- [ ] Set up SQL Server backup strategy
- [ ] Configure logging to file/cloud
- [ ] Implement monitoring and alerting
- [ ] Test token refresh flow
- [ ] Test replay attack detection
- [ ] Test multi-device logout
- [ ] Load test rate limiting
- [ ] Verify database indexes
- [ ] Set up CI/CD pipeline
- [ ] Document API for frontend team

---

## Troubleshooting

### Database Connection Issues
```
Error: "Cannot open database 'LawyerConnectDB'"
Solution: Ensure SQL Server is running and connection string is correct
```

### JWT Token Invalid
```
Error: "Invalid token" or "Token expired"
Solution: Ensure JWT:Key is at least 32 characters and matches between login/validation
```

### Refresh Token Not Working
```
Error: "Refresh token not found"
Solution: Ensure withCredentials: true in frontend API calls
```

### Rate Limiting Too Strict
```
Error: "429 Too Many Requests"
Solution: Increase RateLimiting:Limit in appsettings.json
```

---

## Summary of New Features (v2.0)

| Feature | Status | Details |
|---------|--------|---------|
| Refresh Tokens | ✅ NEW | 7-day HttpOnly cookies |
| Token Rotation | ✅ NEW | New token on every refresh |
| Sliding Expiration | ✅ NEW | Extends if < 3 days to expiry |
| Replay Detection | ✅ NEW | Revokes all tokens if old token used |
| Logout Endpoint | ✅ NEW | Single or multi-device logout |
| Delete Account | ✅ NEW | Permanent account deletion |
| Token Cleanup | ✅ NEW | Background job removes old tokens |
| Audit Trail | ✅ NEW | RevokedDate, RevokeReason tracking |
| Logging | ✅ ENHANCED | Comprehensive auth event logging |
| Security | ✅ ENHANCED | Enterprise-grade token management |

---

## Next Steps

1. **Frontend Migration:** Use `AUTHENTICATION_MIGRATION_GUIDE.md` to update frontend
2. **Testing:** Test all auth flows (login, refresh, logout, delete account)
3. **Deployment:** Follow deployment checklist
4. **Monitoring:** Set up logging and alerting
5. **Documentation:** Keep this document updated

