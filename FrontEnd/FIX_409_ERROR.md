# 🔧 How to Fix "API Error: 409 Conflict"

## What Does This Error Mean?

The **409 Conflict** error means the email address you're trying to register is **already in the database**.

## 🎯 Quick Solutions

### Option 1: Use a Different Email (Recommended)
Simply try registering with a different email address:
- Instead of: `test@example.com`
- Try: `test2@example.com` or `john.doe123@example.com`

### Option 2: Login with Existing Account
If you already registered this email:
1. Click "Sign in" instead of "Sign up"
2. Enter your email and password
3. You'll be logged in to your existing account

### Option 3: Clear the Database (Development Only)

If you're testing and want to start fresh:

#### Method A: Using SQL Script (Easiest)
1. Open **SQL Server Management Studio** or **Azure Data Studio**
2. Connect to your database
3. Open the file: `ClearDatabase.sql` (in the root folder)
4. Click **Execute** or press **F5**
5. All data will be cleared
6. Try registering again

#### Method B: Manual SQL Commands
Run these commands in your SQL client:

```sql
USE LawyerConnectDB;

-- Delete all data
DELETE FROM Bookings;
DELETE FROM Lawyers;
DELETE FROM Users;

-- Reset IDs (optional)
DBCC CHECKIDENT ('Bookings', RESEED, 0);
DBCC CHECKIDENT ('Lawyers', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
```

## 🔍 Check What's in the Database

To see which emails are already registered:

```sql
USE LawyerConnectDB;

-- See all registered users
SELECT Id, FullName, Email, Role, CreatedAt 
FROM Users 
ORDER BY CreatedAt DESC;

-- See all lawyers
SELECT L.Id, U.FullName, U.Email, L.Specialization, L.Price
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id;
```

## 🎨 The Error Message Now Shows

When you get a 409 error, the signup form will now show:

```
❌ This email is already registered. Please use a different email or try logging in.

💡 Tip: This email is already registered. Try logging in or use a different email address.
```

You can click "logging in" to switch to the login form.

## 📝 Testing Tips

### Use Unique Emails for Testing
Create a pattern:
- `client1@test.com`
- `client2@test.com`
- `lawyer1@test.com`
- `lawyer2@test.com`

### Or Use Plus Addressing (Gmail)
If you have Gmail, you can use:
- `youremail+test1@gmail.com`
- `youremail+test2@gmail.com`
- `youremail+lawyer1@gmail.com`

All emails go to `youremail@gmail.com` but are treated as different addresses!

## 🚀 After Clearing Database

1. **Restart Backend** (optional but recommended):
   ```bash
   # Stop: Ctrl+C
   # Start: dotnet run
   ```

2. **Refresh Frontend**: Press F5 in browser

3. **Try Registering Again**: Use any email you want

## ✅ Verify Registration Worked

After successful registration:

1. **Check Database**:
```sql
SELECT * FROM Users WHERE Email = 'your@email.com';
```

2. **Check Lawyer Profile** (if you registered as lawyer):
```sql
SELECT L.*, U.Email 
FROM Lawyers L
INNER JOIN Users U ON L.UserId = U.Id
WHERE U.Email = 'your@email.com';
```

3. **Try Logging In**: Use the credentials you just created

## 🆘 Still Getting 409 Error?

1. **Double-check the email**: Make sure you're using a NEW email
2. **Clear browser cache**: Press Ctrl+Shift+Delete
3. **Check database**: Run the SELECT query above to see existing emails
4. **Restart everything**:
   - Stop backend (Ctrl+C)
   - Stop frontend (Ctrl+C)
   - Clear database (run ClearDatabase.sql)
   - Start backend: `dotnet run`
   - Start frontend: `cd FrontEnd && npm run dev`

## 📞 Need More Help?

Check these files:
- `TROUBLESHOOTING.md` - Complete troubleshooting guide
- `ClearDatabase.sql` - SQL script to clear all data
- Backend logs - Look at the terminal where `dotnet run` is running

The error handling has been improved, so you'll now see helpful messages when this happens! 🎉
