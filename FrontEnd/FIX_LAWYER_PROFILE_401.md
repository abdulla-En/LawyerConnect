# 🔧 Fix: Lawyer Profile 401 Unauthorized Error

## 🐛 The Problem

When registering as a lawyer, you see:
```
User created but lawyer profile failed: API Error: 401 Unauthorized
```

This means:
1. ✅ User account was created successfully in the `Users` table
2. ❌ Lawyer profile creation failed because the JWT token wasn't available yet

## 🔍 What's Happening

The registration flow is:
1. Frontend calls `/api/auth/register` → Creates user, returns token
2. Frontend stores token in localStorage
3. Frontend calls `/api/lawyers/register` → Needs the token for authentication
4. **Problem**: Step 3 happens before token is fully stored

## ✅ Solutions Implemented

### 1. Token Availability Check
The code now waits for the token to be available:
```typescript
// Wait up to 2 seconds for token (10 attempts × 200ms)
let attempts = 0
while (!localStorage.getItem('authToken') && attempts < 10) {
  await new Promise(resolve => setTimeout(resolve, 200))
  attempts++
}
```

### 2. Better Error Messages
If it fails, you now see:
```
User account created successfully, but lawyer profile failed: [reason]
Please login and contact support to complete your profile.
```

### 3. Debug Logging
Check browser console (F12) to see:
- `Token available: true/false`
- `Attempts needed: X`
- `Creating lawyer profile...`
- `Lawyer profile created successfully!`

## 🧪 Testing the Fix

### Test 1: Normal Registration
1. Clear database and cache
2. Register as a lawyer
3. Check console for logs
4. Should see: "Lawyer profile created successfully!"
5. Check database:
```sql
SELECT * FROM Users WHERE Email = 'your@email.com';
SELECT * FROM Lawyers WHERE UserId = (SELECT Id FROM Users WHERE Email = 'your@email.com');
```

### Test 2: If It Still Fails
1. Open browser console (F12)
2. Look for the debug logs
3. Check how many attempts were needed
4. If attempts = 10, the token never appeared

## 🔧 Manual Fix (If Lawyer Profile Wasn't Created)

If your user was created but lawyer profile wasn't:

### Step 1: Login with Your Account
```
Email: your@email.com
Password: [your password]
```

### Step 2: Get Your User ID
Open browser console (F12) and run:
```javascript
const user = JSON.parse(localStorage.getItem('user'))
console.log('User ID:', user.id)
```

### Step 3: Manually Create Lawyer Profile
In SSMS, run:
```sql
-- Replace [USER_ID] with your actual user ID
INSERT INTO Lawyers (UserId, Specialization, ExperienceYears, Price, Verified, Address, Latitude, Longitude, CreatedAt)
VALUES (
    [USER_ID],                    -- Your user ID
    'Corporate Law',              -- Your specialization
    10,                           -- Years of experience
    500.00,                       -- Hourly rate in EGP
    0,                            -- Not verified yet
    '123 Main St, Cairo, Egypt',  -- Your address
    30.0444,                      -- Cairo latitude
    31.2357,                      -- Cairo longitude
    GETDATE()                     -- Current timestamp
);
```

### Step 4: Verify
```sql
SELECT L.*, U.FullName, U.Email 
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id
WHERE U.Email = 'your@email.com';
```

### Step 5: Refresh Page
Press F5 and navigate to `/dashboard`

## 🎯 Prevention Tips

### 1. Clear Cache Before Testing
Always clear localStorage before testing:
- Click "Clear Cache (Dev)" button in navbar
- Or run in console: `localStorage.clear()`

### 2. Check Backend is Running
Make sure backend is running on http://localhost:5128

### 3. Check CORS
Backend must allow requests from localhost:3002

### 4. Check Database Connection
Ensure SQL Server is running and accessible

## 🔍 Debugging Steps

### 1. Check Browser Console
Press F12 and look for:
```
Token available: true
Attempts needed: 1
Creating lawyer profile...
Lawyer profile created successfully!
```

### 2. Check Network Tab
Press F12 → Network tab:
- Look for `/api/auth/register` - Should return 200 with token
- Look for `/api/lawyers/register` - Should return 201 or 200
- If 401, check the request headers for Authorization token

### 3. Check localStorage
Press F12 → Application → Local Storage:
- `authToken` should exist
- `user` should exist with your data

### 4. Check Backend Logs
Look at the terminal where `dotnet run` is running:
- Should see successful user registration
- Should see lawyer profile creation attempt
- Look for any error messages

## 🆘 Still Getting 401?

### Check Token Format
In console:
```javascript
const token = localStorage.getItem('authToken')
console.log('Token:', token)
console.log('Token length:', token?.length)
console.log('Token starts with:', token?.substring(0, 20))
```

Should see something like:
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Token length: 200+ characters
Token starts with: eyJhbGciOiJIUzI1NiIs
```

### Check API Request
In Network tab, click on `/api/lawyers/register`:
- **Headers** tab → Request Headers
- Should see: `Authorization: Bearer eyJhbGci...`
- If missing, token wasn't sent

### Check Backend Auth
Backend expects:
```
Authorization: Bearer [token]
```

Make sure `apiService.ts` is adding this header.

## ✅ Expected Behavior

After successful registration:
1. User created in `Users` table
2. Token stored in localStorage
3. Lawyer profile created in `Lawyers` table
4. Modal closes
5. Redirected to `/dashboard`
6. Can see lawyer dashboard with appointments

## 📊 Database Verification

After successful registration, verify:

```sql
-- Check user exists
SELECT * FROM Users WHERE Email = 'your@email.com';

-- Check lawyer profile exists
SELECT L.*, U.FullName, U.Email 
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id
WHERE U.Email = 'your@email.com';

-- Should see both records with matching UserId
```

## 🎉 Success Indicators

You'll know it worked when:
- ✅ No error message appears
- ✅ Modal closes automatically
- ✅ Redirected to `/dashboard`
- ✅ Console shows: "Lawyer profile created successfully!"
- ✅ Database has both User and Lawyer records
- ✅ Can see lawyer dashboard

The improvements should fix the 401 error. If you still see it, check the debug logs in the console! 🚀
