# Frontend Authentication Migration Guide

## Overview

The backend authentication system has been completely redesigned with enterprise-grade security features. This document outlines the changes and provides implementation guidance for the frontend.

---

## 🔄 What Changed in the Backend

### Old System (Deprecated)
- ❌ Long-lived access tokens (120 minutes)
- ❌ No refresh token mechanism
- ❌ No token rotation
- ❌ No replay attack detection
- ❌ No automatic token renewal
- ❌ Logout only cleared local storage

### New System (Current)
- ✅ Short-lived access tokens (30 minutes)
- ✅ Refresh tokens (7 days) stored in HttpOnly cookies
- ✅ Token rotation on every refresh if the expire data < 3 
- ✅ Replay attack detection (revokes all tokens if old token used)
- ✅ Automatic token renewal before expiration
- ✅ Multi-device logout capability
- ✅ Comprehensive audit trail (RevokedDate, RevokeReason)
- ✅ Background cleanup job (removes tokens > 14 days old)

---

## 📋 Backend Endpoints (Updated)

### Authentication Endpoints

#### 1. **POST /api/auth/register**
Register a new user
```
Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe",
  "role": "User" // or "Lawyer"
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
Login user
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

#### 3. **POST /api/auth/refresh** ⭐ NEW
Refresh access token using refresh token from cookie
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
- Token rotation: Old refresh token revoked, new one issued
- Sliding expiration: If < 3 days until expiry, extends to 7 days
- Replay detection: If old token used, ALL user tokens revoked
```

#### 4. **POST /api/auth/logout** ⭐ NEW
Logout user
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
- Single device: Only current refresh token revoked
- All devices: All user's refresh tokens revoked
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

### User Endpoints

#### 6. **PUT /api/users/update**
Update user profile
```
Request:
- Authorization: Bearer {accessToken}
- Body: { "fullName": "...", "phone": "...", "city": "..." }

Response (204 No Content)
```

#### 7. **PUT /api/users/change-password** ⭐ UPDATED
Change password (revokes all tokens)
```
Request:
- Authorization: Bearer {accessToken}
- Body: { "currentPassword": "...", "newPassword": "..." }

Response (200 OK):
{
  "message": "Password changed successfully. Please login again."
}

Behavior:
- ALL refresh tokens revoked
- User must login again on all devices
- Logged: "User {userId} changed password. All sessions revoked."
```

#### 8. **DELETE /api/users/delete-account** ⭐ NEW
Delete user account
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
- ALL refresh tokens revoked before deletion
- User account permanently deleted
- All related data deleted (cascade)
```

#### 9. **PUT /api/users/upload-photo**
Upload profile photo
```
Request:
- Authorization: Bearer {accessToken}
- Body: { "photoBase64": "data:image/jpeg;base64,..." }

Response (200 OK):
{
  "profilePhoto": "data:image/jpeg;base64,..."
}
```

#### 10. **DELETE /api/users/remove-photo**
Remove profile photo
```
Request:
- Authorization: Bearer {accessToken}

Response (204 No Content)
```

---

## 🔐 Frontend Implementation Requirements

### 1. Token Storage Strategy

**Access Token:**
- Store in memory (NOT localStorage/sessionStorage)
- Reason: Prevents XSS attacks from stealing tokens
- Lost on page refresh (acceptable - refresh token handles renewal)

**Refresh Token:**
- Automatically stored in HttpOnly cookie by backend
- Frontend CANNOT access it directly (security feature)
- Automatically sent with requests
- Cleared on logout

```typescript
// ✅ CORRECT
const accessToken = useRef<string | null>(null);

// ❌ WRONG
localStorage.setItem('accessToken', token); // XSS vulnerability
sessionStorage.setItem('accessToken', token); // Still vulnerable
```

---

### 2. AuthContext Implementation

```typescript
// FrontEnd/src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  profilePhoto?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: (logoutAllDevices?: boolean) => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  error: string | null;
  clearError: () => void;
  isRefreshing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const response = await apiService.post('/api/auth/login', {
        email,
        password,
      });

      setAccessToken(response.token);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const register = useCallback(async (data: any) => {
    try {
      setError(null);
      const response = await apiService.post('/api/auth/register', data);

      setAccessToken(response.token);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshing) return false;

    try {
      setIsRefreshing(true);
      const response = await apiService.post('/api/auth/refresh', {});

      setAccessToken(response.token);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch (err: any) {
      console.error('Token refresh failed:', err);
      // Refresh failed - user needs to login again
      await logout();
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const logout = useCallback(async (logoutAllDevices: boolean = false) => {
    try {
      // Call logout endpoint to revoke tokens
      await apiService.post(
        `/api/auth/logout?logoutAllDevices=${logoutAllDevices}`,
        {}
      );
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      // Clear local state regardless of API success
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('user');
      // Cookies are cleared by backend
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      setError(null);
      await apiService.delete('/api/users/delete-account');
      
      // Clear local state
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('user');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Account deletion failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user && !!accessToken,
        accessToken,
        login,
        register,
        logout,
        deleteAccount,
        refreshAccessToken,
        updateUser,
        error,
        clearError,
        isRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### 3. API Service with Automatic Token Refresh

```typescript
// FrontEnd/src/services/api.ts

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private authContext: any = null;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
      withCredentials: true, // Important: Send cookies with requests
    });

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // If 401 and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            if (this.authContext) {
              const refreshed = await this.authContext.refreshAccessToken();
              
              if (refreshed) {
                // Retry original request with new token
                return this.api(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Redirect to login
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Request interceptor to add access token
    this.api.interceptors.request.use((config) => {
      if (this.authContext?.accessToken) {
        config.headers.Authorization = `Bearer ${this.authContext.accessToken}`;
      }
      return config;
    });
  }

  setAuthContext(context: any) {
    this.authContext = context;
  }

  async get(url: string, config?: any) {
    return this.api.get(url, config);
  }

  async post(url: string, data?: any, config?: any) {
    return this.api.post(url, data, config);
  }

  async put(url: string, data?: any, config?: any) {
    return this.api.put(url, data, config);
  }

  async delete(url: string, config?: any) {
    return this.api.delete(url, config);
  }

  async uploadProfilePhoto(photoBase64: string) {
    return this.post('/api/users/upload-photo', { photoBase64 });
  }

  async removeProfilePhoto() {
    return this.delete('/api/users/remove-photo');
  }

  async updateProfile(data: any) {
    return this.put('/api/users/update', data);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.put('/api/users/change-password', {
      currentPassword,
      newPassword,
    });
  }
}

export const apiService = new ApiService();
```

---

### 4. App.tsx Integration

```typescript
// FrontEnd/src/App.tsx

import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { apiService } from './services/api';

function App() {
  const auth = useAuth();

  // Set auth context in API service
  useEffect(() => {
    apiService.setAuthContext(auth);
  }, [auth]);

  // Optional: Refresh token before expiration
  useEffect(() => {
    if (!auth.isLoggedIn) return;

    // Refresh token every 25 minutes (access token expires in 30)
    const refreshInterval = setInterval(() => {
      auth.refreshAccessToken();
    }, 25 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [auth.isLoggedIn]);

  return (
    // Your app components
    <div>
      {/* App content */}
    </div>
  );
}

export default App;
```

---

### 5. Logout Implementation

```typescript
// FrontEnd/src/components/Navbar.tsx

import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      // Single device logout (default)
      await logout(false);
      // Or multi-device logout:
      // await logout(true);
      
      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      await logout(true); // Logout from all devices
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogoutAllDevices}>Logout All Devices</button>
    </div>
  );
}
```

---

### 6. Delete Account Implementation

```typescript
// FrontEnd/src/pages/AccountPage.tsx

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error('Account deletion failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAccount} className="btn-danger">
        Delete Account
      </button>
    </div>
  );
}
```

---

## 🔄 Token Refresh Flow

```
User Action
    ↓
API Request with Access Token
    ↓
Backend Response
    ├─ 200: Success ✅
    │
    └─ 401: Token Expired
        ↓
    Frontend detects 401
        ↓
    Call POST /api/auth/refresh
        ↓
    Backend validates refresh token (from cookie)
        ├─ Valid: Issue new access token + rotate refresh token ✅
        │   ↓
        │   Retry original request with new token
        │
        └─ Invalid/Revoked: Redirect to login ❌
```

---

## 🚨 Error Handling

### Access Token Expired (401)
- Automatically handled by API interceptor
- Attempts refresh
- If refresh fails, redirects to login

### Refresh Token Expired
- User must login again
- All sessions invalidated

### Replay Attack Detected
- All user tokens revoked
- User redirected to login
- Security alert logged

### Password Changed
- All tokens revoked
- User must login again on all devices

---

## ✅ Checklist for Frontend Migration

- [ ] Update AuthContext to handle access token in memory
- [ ] Implement API interceptors for automatic token refresh
- [ ] Add refresh token rotation handling
- [ ] Implement logout with token revocation
- [ ] Add delete account functionality
- [ ] Handle 401 errors with automatic refresh
- [ ] Add periodic token refresh (every 25 minutes)
- [ ] Update login/register to use new endpoints
- [ ] Test multi-device logout
- [ ] Test replay attack scenario
- [ ] Test password change flow
- [ ] Test account deletion
- [ ] Verify cookies are sent with requests (withCredentials: true)
- [ ] Test token expiration and refresh
- [ ] Add error handling for all auth flows

---

## 🔒 Security Best Practices

1. **Never store access token in localStorage/sessionStorage**
   - Use memory only
   - Lost on refresh (acceptable)

2. **Always use withCredentials: true**
   - Ensures cookies sent with requests
   - Refresh token automatically included

3. **Implement HTTPS in production**
   - Secure flag on cookies
   - Prevents token interception

4. **Handle 401 errors gracefully**
   - Attempt refresh
   - Redirect to login if refresh fails

5. **Clear tokens on logout**
   - Clear memory
   - Backend clears cookies
   - Revoke refresh tokens

6. **Implement token refresh before expiration**
   - Refresh every 25 minutes (token expires in 30)
   - Prevents user interruption

---

## 📝 Summary of Changes

| Aspect | Old System | New System |
|--------|-----------|-----------|
| Access Token Lifetime | 120 minutes | 30 minutes |
| Refresh Token | None | 7 days (HttpOnly cookie) |
| Token Rotation | No | Yes (on every refresh) |
| Replay Detection | No | Yes (revokes all tokens) |
| Automatic Refresh | No | Yes (via interceptor) |
| Logout | Clear localStorage | Revoke tokens + clear cookies |
| Multi-device Logout | No | Yes |
| Token Storage | localStorage | Memory + HttpOnly cookie |
| Security | Basic | Enterprise-grade |

---

## 🚀 Next Steps

1. Implement the new AuthContext
2. Update API service with interceptors
3. Update login/register pages
4. Add logout functionality
5. Add delete account functionality
6. Test all flows
7. Deploy to production

