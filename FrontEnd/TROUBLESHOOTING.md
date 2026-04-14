# Troubleshooting Guide

## 🔴 Common Errors

### 1. API Error: 409 Conflict

**Cause**: This error occurs when:
- The email address is already registered in the system
- A lawyer profile already exists for the user account

**Solutions**:

#### Option A: Use a Different Email
Try registering with a different email address.

#### Option B: Login Instead
If you already have an account, click "Sign in" and use your existing credentials.

#### Option C: Clear Database (Development Only)
If you're testing and want to start fresh:

1. **Open SQL Server Management Studio** or **Azure Data Studio**
2. **Connect to your database**: `LawyerConnectDB`
3. **Run these commands**:

```sql
-- Delete all bookings first (foreign key constraint)
DELETE FROM Bookings;

-- Delete all lawyers
DELETE FROM Lawyers;

-- Delete all users
DELETE FROM Users;

-- Reset identity columns (optional)
DBCC CHECKIDENT ('Bookings', RESEED, 0);
DBCC CHECKIDENT ('Lawyers', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
```

4. **Refresh the page** and try registering again

#### Option D: Check Existing Users
To see what emails are already registered:

```sql
SELECT Id, FullName, Email, Role, CreatedAt 
FROM Users 
ORDER BY CreatedAt DESC;
```

### 2. Failed to Fetch

**Cause**: Backend API is not running or CORS issue

**Solutions**:
1. Make sure backend is running: `dotnet run`
2. Check backend is on: http://localhost:5128
3. Check frontend .env.local has: `VITE_API_URL=http://localhost:5128/api`
4. Restart frontend after changing .env.local

### 3. Lawyer Profile Already Exists

**Cause**: Trying to create a lawyer profile when one already exists for the user

**Solutions**:
1. Login with your existing account
2. Navigate to /dashboard to see your lawyer profile
3. If you need to create a new lawyer account, use a different email

### 4. Validation Errors

**Cause**: Missing or invalid fields

**Solutions**:
- **Full Name**: Required, cannot be empty
- **Email**: Must be valid email format
- **Phone**: Required
- **City**: Required
- **Password**: Minimum 6 characters
- **Specialization** (Lawyer): Must select from dropdown
- **Years of Experience** (Lawyer): 0-60
- **Hourly Rate** (Lawyer): Must be positive number
- **Office Address** (Lawyer): Required
- **Latitude/Longitude** (Lawyer): Valid coordinates

## 🧪 Testing Tips

### Test with Unique Emails
Use a pattern like:
- `test1@example.com`
- `test2@example.com`
- `lawyer1@example.com`
- `lawyer2@example.com`

### Test Data Examples

**Client Account**:
```
Full Name: John Doe
Email: john.doe@example.com
Phone: +20 1234567890
City: Cairo
Password: password123
Role: Client
```

**Lawyer Account**:
```
Full Name: Sarah Smith
Email: sarah.smith@example.com
Phone: +20 9876543210
City: Alexandria
Password: password123
Role: Lawyer

Specialization: Corporate Law
Years of Experience: 15
Hourly Rate: 750
Office Address: 456 Business St, Alexandria, Egypt
Latitude: 31.2001
Longitude: 29.9187
```

## 📊 Database Queries

### Check All Users
```sql
SELECT * FROM Users;
```

### Check All Lawyers
```sql
SELECT L.*, U.FullName, U.Email 
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id;
```

### Check All Bookings
```sql
SELECT * FROM Bookings;
```

### Find User by Email
```sql
SELECT * FROM Users WHERE Email = 'your@email.com';
```

### Check if Lawyer Profile Exists
```sql
SELECT L.*, U.Email 
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id
WHERE U.Email = 'your@email.com';
```

## 🔧 Quick Fixes

### Reset Everything (Development)
```sql
-- Backup first if needed!
DELETE FROM Bookings;
DELETE FROM Lawyers;
DELETE FROM Users;
```

### Remove Specific User
```sql
-- Find the user ID first
SELECT Id FROM Users WHERE Email = 'unwanted@email.com';

-- Delete their bookings
DELETE FROM Bookings WHERE UserId = [ID] OR LawyerId IN (SELECT Id FROM Lawyers WHERE UserId = [ID]);

-- Delete their lawyer profile if exists
DELETE FROM Lawyers WHERE UserId = [ID];

-- Delete the user
DELETE FROM Users WHERE Id = [ID];
```

## 🆘 Still Having Issues?

1. **Check Backend Logs**: Look at the terminal where `dotnet run` is running
2. **Check Browser Console**: Press F12 and look for errors
3. **Check Network Tab**: See the actual API request/response
4. **Verify Database Connection**: Make sure SQL Server is running
5. **Check CORS**: Backend must allow requests from localhost:3002

## 📝 Error Message Reference

| Error | Meaning | Solution |
|-------|---------|----------|
| 409 Conflict | Email already exists | Use different email or login |
| 401 Unauthorized | Invalid credentials | Check email/password |
| 400 Bad Request | Invalid data format | Check all required fields |
| 404 Not Found | Resource doesn't exist | Check URL/endpoint |
| 500 Internal Server Error | Backend error | Check backend logs |

## ✅ Verification Steps

After registration, verify:

1. **User Created**:
```sql
SELECT * FROM Users WHERE Email = 'your@email.com';
```

2. **Lawyer Profile Created** (if lawyer):
```sql
SELECT * FROM Lawyers WHERE UserId = (SELECT Id FROM Users WHERE Email = 'your@email.com');
```

3. **Can Login**: Try logging in with the credentials
4. **Dashboard Works**: Navigate to /dashboard after login
5. **Profile Shows**: Check /account page

## 🎯 Best Practices

1. **Use Unique Emails**: Don't reuse emails during testing
2. **Clear Data Regularly**: Clean database between test runs
3. **Check Logs**: Always check backend logs for detailed errors
4. **Test Both Roles**: Test as both Client and Lawyer
5. **Verify Database**: Check database after each registration

Need more help? Check the backend logs for detailed error messages!
