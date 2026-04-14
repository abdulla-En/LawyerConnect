# AuthService Architecture Diagram

## Complete Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Frontend)                         │
│                                                                   │
│  POST /api/auth/register                                         │
│  POST /api/auth/login                                            │
│  GET  /api/auth/me                                               │
│  POST /api/auth/refresh                                          │
│  POST /api/auth/logout                                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HTTP LAYER (Controller)                       │
│                                                                   │
│  AuthController                                                  │
│  ├── Register()      - HTTP POST handling                        │
│  ├── Login()         - HTTP POST handling + Cookie setup         │
│  ├── Me()            - HTTP GET handling                         │
│  ├── Refresh()       - HTTP POST handling + Cookie update        │
│  └── Logout()        - HTTP POST handling + Cookie deletion      │
│                                                                   │
│  Responsibilities:                                               │
│  • Parse HTTP requests                                           │
│  • Validate input format                                         │
│  • Set/update/delete cookies                                     │
│  • Handle HTTP errors                                            │
│  • Return HTTP responses                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER (Service)                  │
│                                                                   │
│  IAuthService (Interface)                                        │
│  ├── RegisterAsync()                                             │
│  ├── LoginAsync()                                                │
│  ├── RefreshTokenAsync()                                         │
│  ├── LogoutAsync()                                               │
│  └── GetUserByIdAsync()                                          │
│                                                                   │
│  AuthService (Implementation)                                    │
│  ├── User registration logic                                     │
│  ├── Password validation                                         │
│  ├── Token generation (JWT)                                      │
│  ├── Token refresh with rotation                                 │
│  ├── Sliding expiration logic                                    │
│  ├── Replay attack detection                                     │
│  ├── Multi-device logout logic                                   │
│  ├── Comprehensive logging                                       │
│  └── Private utilities:                                          │
│      ├── GenerateRefreshToken()                                  │
│      ├── GenerateJwt()                                           │
│      └── HashObject()                                            │
│                                                                   │
│  Responsibilities:                                               │
│  • Implement authentication logic                                │
│  • Generate and validate tokens                                  │
│  • Manage token lifecycle                                        │
│  • Detect security threats                                       │
│  • Log all operations                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DATA ACCESS LAYER (Repository)                  │
│                                                                   │
│  IUserRepository                                                 │
│  ├── GetByEmailAsync()                                           │
│  ├── GetByIdAsync()                                              │
│  ├── AddAsync()                                                  │
│  └── SaveChangesAsync()                                          │
│                                                                   │
│  IRefreshTokenRepository                                         │
│  ├── AddAsync()                                                  │
│  ├── GetByTokenHashAsync()                                       │
│  ├── RevokeAsync()                                               │
│  ├── RevokeAllAsync()                                            │
│  └── DeleteOldTokensAsync()                                      │
│                                                                   │
│  Responsibilities:                                               │
│  • Query database                                                │
│  • Insert/update/delete records                                  │
│  • Manage transactions                                           │
│  • Handle database errors                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PERSISTENCE LAYER (Database)                    │
│                                                                   │
│  SQL Server                                                      │
│  ├── Users table                                                 │
│  │   ├── Id (PK)                                                 │
│  │   ├── Email (UNIQUE)                                          │
│  │   ├── PasswordHash                                            │
│  │   ├── FullName                                                │
│  │   ├── Phone                                                   │
│  │   ├── City                                                    │
│  │   ├── Role                                                    │
│  │   └── CreatedAt                                               │
│  │                                                                │
│  └── RefreshTokens table                                         │
│      ├── Id (PK)                                                 │
│      ├── UserId (FK)                                             │
│      ├── TokenHash (UNIQUE)                                      │
│      ├── ExpiresAt                                               │
│      ├── Revoked                                                 │
│      ├── CreatedAt                                               │
│      ├── RevokedDate                                             │
│      ├── RevokeReason (Enum)                                     │
│      ├── ReplacedByTokenId (FK)                                  │
│      ├── IpAddress                                               │
│      └── UserAgent                                               │
│                                                                   │
│  Responsibilities:                                               │
│  • Store user data                                               │
│  • Store refresh tokens                                          │
│  • Maintain data integrity                                       │
│  • Provide data persistence                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dependency Injection Chain

```
Program.cs
│
├─ builder.Services.AddScoped<IAuthService, AuthService>()
│  │
│  └─ AuthService
│     ├─ IUserRepository (injected)
│     ├─ IRefreshTokenRepository (injected)
│     ├─ IConfiguration (injected)
│     └─ ILogger<AuthService> (injected)
│
├─ builder.Services.AddScoped<IUserRepository, UserRepository>()
│  │
│  └─ UserRepository
│     ├─ LawyerConnectDbContext (injected)
│     └─ ILogger<UserRepository> (injected)
│
├─ builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>()
│  │
│  └─ RefreshTokenRepository
│     ├─ LawyerConnectDbContext (injected)
│     └─ ILogger<RefreshTokenRepository> (injected)
│
└─ AuthController
   ├─ IAuthService (injected)
   ├─ IUserRepository (injected)
   ├─ IConfiguration (injected)
   └─ ILogger<AuthController> (injected)
```

---

## Request/Response Flow

### Login Request Flow

```
1. Client sends POST /api/auth/login
   │
   ├─ Email: "user@example.com"
   └─ Password: "SecurePassword123"
   
   ▼
   
2. AuthController.Login()
   │
   ├─ Extract IP address
   ├─ Extract User-Agent
   └─ Call _authService.LoginAsync()
   
   ▼
   
3. AuthService.LoginAsync()
   │
   ├─ Call _userRepository.GetByEmailAsync()
   │  │
   │  └─ Query: SELECT * FROM Users WHERE Email = ?
   │     ▼
   │     Database returns User or null
   │
   ├─ Hash input password (SHA256)
   │
   ├─ Compare hashes
   │  │
   │  └─ If mismatch: throw UnauthorizedAccessException
   │
   ├─ Generate JWT access token (30 min expiry)
   │
   ├─ Generate refresh token (32 bytes, base64)
   │
   ├─ Hash refresh token (SHA256)
   │
   ├─ Call _refreshTokenRepository.AddAsync()
   │  │
   │  └─ INSERT INTO RefreshTokens (...)
   │     ▼
   │     Database stores token
   │
   ├─ Log: "User {userId} logged in successfully"
   │
   └─ Return AuthResponseDto
      ├─ Token: JWT access token
      ├─ ExpiresAt: 2024-02-06T14:30:00Z
      ├─ User: UserResponseDto
      ├─ RefreshToken: Base64 string
      └─ RefreshTokenExpires: 2024-02-13T10:00:00Z
   
   ▼
   
4. AuthController.Login() (continued)
   │
   ├─ Set HttpOnly cookie
   │  │
   │  └─ Cookie: refreshToken = {refreshToken}
   │     ├─ HttpOnly: true (not accessible to JavaScript)
   │     ├─ Secure: true (HTTPS only)
   │     ├─ SameSite: Lax
   │     └─ Expires: 2024-02-13T10:00:00Z
   │
   └─ Return 200 OK with AuthResponseDto
   
   ▼
   
5. Client receives response
   │
   ├─ Store access token in memory
   ├─ Store user info in localStorage
   ├─ Receive refresh token in cookie (automatic)
   └─ Redirect to dashboard
```

---

## Token Refresh Flow

```
1. Client sends POST /api/auth/refresh
   │
   └─ Cookie: refreshToken = {refreshToken}
   
   ▼
   
2. AuthController.Refresh()
   │
   ├─ Extract refresh token from cookie
   ├─ Extract IP address
   ├─ Extract User-Agent
   └─ Call _authService.RefreshTokenAsync()
   
   ▼
   
3. AuthService.RefreshTokenAsync()
   │
   ├─ Hash refresh token (SHA256)
   │
   ├─ Call _refreshTokenRepository.GetByTokenHashAsync()
   │  │
   │  └─ Query: SELECT * FROM RefreshTokens WHERE TokenHash = ?
   │     ▼
   │     Database returns RefreshToken or null
   │
   ├─ Check if token is revoked
   │  │
   │  └─ If revoked: 
   │     ├─ Log: "SECURITY ALERT: Replay attack detected"
   │     ├─ Call _refreshTokenRepository.RevokeAllAsync()
   │     │  │
   │     │  └─ UPDATE RefreshTokens SET Revoked=1 WHERE UserId=?
   │     │     ▼
   │     │     Database revokes all tokens
   │     │
   │     └─ Throw UnauthorizedAccessException
   │
   ├─ Check if token is expired
   │  │
   │  └─ If expired: Throw UnauthorizedAccessException
   │
   ├─ Check if token is close to expiration (< 3 days)
   │  │
   │  └─ If yes: Set shouldRotate = true
   │
   ├─ Generate new JWT access token (30 min expiry)
   │
   ├─ Generate new refresh token (32 bytes, base64)
   │
   ├─ Hash new refresh token (SHA256)
   │
   ├─ Create new RefreshToken record
   │
   ├─ Call _refreshTokenRepository.AddAsync()
   │  │
   │  └─ INSERT INTO RefreshTokens (...)
   │     ▼
   │     Database stores new token
   │
   ├─ Revoke old token
   │  │
   │  └─ UPDATE RefreshTokens SET Revoked=1, RevokeReason=Rotation
   │     ▼
   │     Database revokes old token
   │
   ├─ Log: "User {userId} token refreshed successfully"
   │
   └─ Return AuthResponseDto
      ├─ Token: New JWT access token
      ├─ ExpiresAt: 2024-02-06T14:30:00Z
      ├─ User: UserResponseDto
      ├─ RefreshToken: New base64 string
      └─ RefreshTokenExpires: 2024-02-13T10:00:00Z (extended if rotated)
   
   ▼
   
4. AuthController.Refresh() (continued)
   │
   ├─ Update HttpOnly cookie
   │  │
   │  └─ Cookie: refreshToken = {newRefreshToken}
   │     ├─ HttpOnly: true
   │     ├─ Secure: true
   │     ├─ SameSite: Lax
   │     └─ Expires: 2024-02-13T10:00:00Z
   │
   └─ Return 200 OK with AuthResponseDto
   
   ▼
   
5. Client receives response
   │
   ├─ Update access token in memory
   ├─ Update user info in localStorage
   ├─ Receive new refresh token in cookie (automatic)
   └─ Continue with original request
```

---

## Logout Flow

```
1. Client sends POST /api/auth/logout?logoutAllDevices=false
   │
   ├─ Authorization: Bearer {accessToken}
   └─ Cookie: refreshToken = {refreshToken}
   
   ▼
   
2. AuthController.Logout()
   │
   ├─ Extract user ID from JWT claims
   ├─ Extract refresh token from cookie
   └─ Call _authService.LogoutAsync()
   
   ▼
   
3. AuthService.LogoutAsync()
   │
   ├─ Hash refresh token (SHA256)
   │
   ├─ Call _refreshTokenRepository.GetByTokenHashAsync()
   │  │
   │  └─ Query: SELECT * FROM RefreshTokens WHERE TokenHash = ?
   │     ▼
   │     Database returns RefreshToken or null
   │
   ├─ If logoutAllDevices = false (single device)
   │  │
   │  ├─ Revoke current token
   │  │  │
   │  │  └─ UPDATE RefreshTokens SET Revoked=1, RevokeReason=Logout
   │  │     ▼
   │  │     Database revokes token
   │  │
   │  └─ Log: "User {userId} logged out from current device"
   │
   └─ If logoutAllDevices = true (all devices)
      │
      ├─ Call _refreshTokenRepository.RevokeAllAsync()
      │  │
      │  └─ UPDATE RefreshTokens SET Revoked=1, RevokeReason=LogoutAll WHERE UserId=?
      │     ▼
      │     Database revokes all tokens
      │
      └─ Log: "User {userId} logged out from all devices"
   
   ▼
   
4. AuthController.Logout() (continued)
   │
   ├─ Delete refresh token cookie
   │  │
   │  └─ Response.Cookies.Delete("refreshToken")
   │
   └─ Return 200 OK
      └─ Message: "Logged out successfully" or "Logged out from all devices"
   
   ▼
   
5. Client receives response
   │
   ├─ Clear access token from memory
   ├─ Clear user info from localStorage
   ├─ Cookie automatically deleted
   └─ Redirect to login page
```

---

## Error Handling Flow

```
Any endpoint error:
│
├─ UnauthorizedAccessException
│  │
│  └─ Return 401 Unauthorized
│     └─ Message: "Invalid credentials" or "Token expired"
│
├─ KeyNotFoundException
│  │
│  └─ Return 404 Not Found
│     └─ Message: "User not found"
│
└─ Generic Exception
   │
   └─ Return 500 Internal Server Error
      ├─ Log error details
      └─ Message: "An error occurred"
```

---

## Security Flow

```
Replay Attack Detection:
│
├─ User tries to use old/revoked refresh token
│  │
│  └─ AuthService.RefreshTokenAsync()
│     │
│     ├─ Check: if (storedToken.Revoked)
│     │  │
│     │  ├─ Log: "SECURITY ALERT: Replay attack detected"
│     │  │
│     │  ├─ Call RevokeAllAsync()
│     │  │  │
│     │  │  └─ Revoke ALL user tokens
│     │  │
│     │  └─ Throw UnauthorizedAccessException
│     │
│     └─ Return 401 Unauthorized
│
└─ User must login again
```

---

## Token Lifecycle

```
Token Creation:
│
├─ User logs in
│  │
│  └─ Generate refresh token (32 bytes, base64)
│     │
│     └─ Hash token (SHA256)
│        │
│        └─ Store in database
│           ├─ TokenHash: hashed value
│           ├─ ExpiresAt: 7 days from now
│           ├─ Revoked: false
│           ├─ CreatedAt: now
│           ├─ IpAddress: user's IP
│           └─ UserAgent: user's browser

Token Usage:
│
├─ Token sent in HttpOnly cookie
│  │
│  └─ Automatically included in requests
│
├─ Token validated on refresh
│  │
│  ├─ Check if revoked
│  ├─ Check if expired
│  └─ Check if close to expiration (< 3 days)

Token Rotation:
│
├─ If < 3 days until expiry
│  │
│  ├─ Generate new token
│  ├─ Store new token in database
│  ├─ Revoke old token (reason: Rotation)
│  ├─ Link old to new (ReplacedByTokenId)
│  └─ Extend expiry to 7 days

Token Revocation:
│
├─ On logout
│  │
│  ├─ Single device: Revoke current token (reason: Logout)
│  └─ All devices: Revoke all tokens (reason: LogoutAll)
│
├─ On password change
│  │
│  └─ Revoke all tokens (reason: PasswordChanged)
│
├─ On account deletion
│  │
│  └─ Revoke all tokens (reason: AccountDeleted)
│
├─ On replay attack
│  │
│  └─ Revoke all tokens (reason: ReplayDetected)
│
└─ On admin force logout
   │
   └─ Revoke all tokens (reason: AdminForceLogout)

Token Cleanup:
│
├─ Background job runs every 10 hours
│  │
│  └─ Delete revoked tokens older than 14 days
│     │
│     └─ Keeps audit trail while cleaning up old data
```

---

## Summary

This architecture provides:
- ✅ **Clean separation of concerns** (HTTP → Service → Repository → Database)
- ✅ **Easy testing** (mock IAuthService)
- ✅ **High reusability** (service can be used anywhere)
- ✅ **Strong security** (token rotation, replay detection, comprehensive logging)
- ✅ **Maintainability** (clear responsibilities)
- ✅ **Scalability** (easy to add new features)
