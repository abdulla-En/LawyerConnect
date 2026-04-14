# API Registration Examples

## ✅ Correct Registration Format

The `/api/auth/register` endpoint expects a **nested structure** with a `user` object (and optionally a `lawyer` object).

---

## 📝 User Registration (Client)

### Request
```http
POST https://localhost:5001/api/auth/register
Content-Type: application/json

{
  "user": {
    "fullName": "Ahmed Hassan",
    "email": "ahmed.hassan@example.com",
    "password": "SecurePass123!",
    "phone": "+201234567890",
    "city": "Cairo",
    "role": "User"
  }
}
```

### Response (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-02-06T14:30:00Z",
  "refreshToken": "abc123...",
  "refreshTokenExpires": "2024-02-13T14:00:00Z",
  "user": {
    "id": 1,
    "email": "ahmed.hassan@example.com",
    "fullName": "Ahmed Hassan",
    "role": "User",
    "phone": "+201234567890",
    "city": "Cairo"
  }
}
```

---

## 👨‍⚖️ Lawyer Registration (Two-Step Process)

### Step 1: Register User Account with Lawyer Role
```http
POST https://localhost:5001/api/auth/register
Content-Type: application/json

{
  "user": {
    "fullName": "Dr. Mohamed Ali",
    "email": "mohamed.ali@lawfirm.com",
    "password": "LawyerPass123!",
    "phone": "+201098765432",
    "city": "Alexandria",
    "role": "Lawyer"
  }
}
```

### Step 2: Create Lawyer Profile (After Login)
```http
POST https://localhost:5001/api/lawyers/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "bio": "Experienced corporate lawyer with 10+ years in commercial law",
  "experienceYears": 10,
  "licenseNumber": "LAW-2014-12345",
  "latitude": 31.2001,
  "longitude": 29.9187,
  "specializationIds": [1, 2]
}
```

---

## 🔐 Admin Registration

### Request (Requires Admin Secret)
```http
POST https://localhost:5001/api/auth/register
Content-Type: application/json

{
  "user": {
    "fullName": "Admin User",
    "email": "admin@lawyerconnect.com",
    "password": "AdminPass123!",
    "phone": "+201234567890",
    "city": "Cairo",
    "role": "Admin",
    "adminSecret": "LawyerConnect_Admin_Registration_Secret_2024"
  }
}
```

**Note**: The `adminSecret` must match the value in `appsettings.json` under `AdminSecret`.

---

## ❌ Common Mistakes

### ❌ Wrong: Flat Structure (Will Fail)
```json
{
  "fullName": "Ahmed Hassan",
  "email": "ahmed.hassan@example.com",
  "password": "SecurePass123!",
  "phone": "+201234567890",
  "city": "Cairo",
  "role": "User"
}
```

**Error Response:**
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "$": [
      "JSON deserialization for type 'LawyerConnect.DTOs.RegisterRequestDto' was missing required properties, including the following: user"
    ],
    "dto": [
      "The dto field is required."
    ]
  }
}
```

### ✅ Correct: Nested Structure
```json
{
  "user": {
    "fullName": "Ahmed Hassan",
    "email": "ahmed.hassan@example.com",
    "password": "SecurePass123!",
    "phone": "+201234567890",
    "city": "Cairo",
    "role": "User"
  }
}
```

---

## 📋 Field Validation Rules

### User Object (Required)
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `fullName` | string | ✅ Yes | Max 100 characters |
| `email` | string | ✅ Yes | Valid email format, max 255 characters |
| `password` | string | ✅ Yes | 6-100 characters |
| `phone` | string | ✅ Yes | Valid phone format, max 20 characters |
| `city` | string | ✅ Yes | Max 100 characters |
| `role` | string | ❌ No | "User", "Lawyer", or "Admin" (default: "User") |
| `adminSecret` | string | ❌ No | Required only if role is "Admin" |

### Lawyer Object (Optional)
Only needed when creating lawyer profile via `/api/lawyers/register` endpoint (after user registration).

---

## 🧪 Testing with cURL

### User Registration
```bash
curl -X POST https://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "fullName": "Ahmed Hassan",
      "email": "ahmed.hassan@example.com",
      "password": "SecurePass123!",
      "phone": "+201234567890",
      "city": "Cairo",
      "role": "User"
    }
  }'
```

### Lawyer Registration
```bash
curl -X POST https://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "fullName": "Dr. Mohamed Ali",
      "email": "mohamed.ali@lawfirm.com",
      "password": "LawyerPass123!",
      "phone": "+201098765432",
      "city": "Alexandria",
      "role": "Lawyer"
    }
  }'
```

---

## 🔍 Troubleshooting

### Error: "JSON deserialization was missing required properties: user"
**Cause**: You're sending a flat JSON structure instead of nested.

**Solution**: Wrap your user data in a `user` object:
```json
{
  "user": {
    // your user data here
  }
}
```

### Error: "Email already registered"
**Cause**: The email is already in the database.

**Solution**: Use a different email or login with existing credentials.

### Error: "Admin registration requires a valid admin secret key"
**Cause**: The `adminSecret` is missing or incorrect.

**Solution**: Include the correct admin secret from `appsettings.json`:
```json
{
  "user": {
    "role": "Admin",
    "adminSecret": "LawyerConnect_Admin_Registration_Secret_2024",
    // ... other fields
  }
}
```

### Error: "Invalid role"
**Cause**: The role value is not one of: "User", "Lawyer", "Admin".

**Solution**: Use one of the valid role values (case-sensitive).

---

## 📚 Related Endpoints

- **Login**: `POST /api/auth/login`
- **Get Profile**: `GET /api/auth/me`
- **Refresh Token**: `POST /api/auth/refresh`
- **Logout**: `POST /api/auth/logout`
- **Create Lawyer Profile**: `POST /api/lawyers/register`

---

**Updated**: LawyerConnect.http file has been corrected with the proper nested structure.
