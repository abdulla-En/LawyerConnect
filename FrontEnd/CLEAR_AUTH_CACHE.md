# 🔄 How to Clear Authentication Cache

## 🤔 Why Can I Still Login After Deleting User from Database?

When you login, the frontend stores two things in your browser's **localStorage**:
1. `authToken` - JWT token for authentication
2. `user` - Your user information (name, email, role, etc.)

Even if you delete the user from the database, these are still in your browser, so the app thinks you're logged in!

## ✅ Solutions (Choose One)

### 🎯 Option 1: Use the "Clear Cache" Button (NEW!)
**Easiest for developers**

1. Click on your user avatar/name in the navbar
2. Look for **"Clear Cache (Dev)"** button (orange color)
3. Click it
4. Page will reload with all cache cleared
5. You'll be logged out automatically

> **Note**: This button only appears in development mode

### 🚪 Option 2: Logout Normally
**Best for regular use**

1. Click on your user avatar/name in the navbar
2. Click **"Logout"**
3. This clears the token and user data
4. You'll be redirected to the home page

### 🔧 Option 3: Clear Browser Storage Manually
**When you need to force-clear everything**

#### Chrome/Edge:
1. Press **F12** to open DevTools
2. Go to **Application** tab
3. In left sidebar, expand **Local Storage**
4. Click on `http://localhost:3002`
5. Right-click → **Clear**
6. Refresh page (F5)

#### Firefox:
1. Press **F12** to open DevTools
2. Go to **Storage** tab
3. Expand **Local Storage**
4. Click on `http://localhost:3002`
5. Right-click → **Delete All**
6. Refresh page (F5)

### 🧹 Option 4: Clear All Browser Data
**Nuclear option - clears everything**

1. Press **Ctrl + Shift + Delete** (Windows/Linux)
2. Or **Cmd + Shift + Delete** (Mac)
3. Select:
   - ✅ Cookies and other site data
   - ✅ Cached images and files
4. Time range: **Last hour** or **All time**
5. Click **Clear data**
6. Refresh page

### 🕵️ Option 5: Use Incognito/Private Window
**Clean slate every time**

1. Press **Ctrl + Shift + N** (Chrome) or **Ctrl + Shift + P** (Firefox)
2. Go to http://localhost:3002
3. No cached data, fresh start!

## 🔍 What's Stored in localStorage?

### authToken
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
This is your JWT token that proves you're authenticated.

### user
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+20 1234567890",
  "city": "Cairo",
  "role": "Lawyer",
  "createdAt": "2024-12-26T..."
}
```
This is your user information displayed in the UI.

## 🛠️ Developer Tools

### Check What's Stored
Open DevTools (F12) and run in Console:
```javascript
// See auth token
console.log(localStorage.getItem('authToken'))

// See user data
console.log(localStorage.getItem('user'))

// See all localStorage
console.log(localStorage)
```

### Manually Clear
Run in Console:
```javascript
// Clear auth token
localStorage.removeItem('authToken')

// Clear user data
localStorage.removeItem('user')

// Clear everything
localStorage.clear()

// Reload page
window.location.reload()
```

## 🔄 Workflow for Testing

### When Testing Registration/Login:

1. **Delete user from database** (SSMS):
   ```sql
   DELETE FROM Bookings WHERE UserId = [ID];
   DELETE FROM Lawyers WHERE UserId = [ID];
   DELETE FROM Users WHERE Id = [ID];
   ```

2. **Clear browser cache**:
   - Click "Clear Cache (Dev)" button in navbar, OR
   - Press F12 → Application → Local Storage → Clear

3. **Refresh page** (F5)

4. **Register/Login** with new credentials

### Quick Reset Script (SSMS):
```sql
-- Clear all data
DELETE FROM Bookings;
DELETE FROM Lawyers;
DELETE FROM Users;

-- Reset IDs
DBCC CHECKIDENT ('Bookings', RESEED, 0);
DBCC CHECKIDENT ('Lawyers', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
```

Then clear browser cache!

## 🎯 Best Practices

### During Development:
1. Use **Incognito window** for testing
2. Or use **"Clear Cache (Dev)"** button frequently
3. Or keep DevTools open and clear localStorage manually

### For Production:
- Users should use **Logout** button
- Never manually delete users from production database!
- If you must, notify users to logout/login again

## ⚠️ Common Issues

### "I deleted the user but I'm still logged in"
→ Clear localStorage (see options above)

### "I can't login with new credentials"
→ Old token is still cached, clear localStorage

### "User data shows old information"
→ User object is cached, clear localStorage

### "API returns 401 Unauthorized"
→ Token is invalid/expired, logout and login again

## 🎉 New Feature: Clear Cache Button

I've added a **"Clear Cache (Dev)"** button in the user menu that:
- ✅ Only shows in development mode
- ✅ Clears all localStorage
- ✅ Reloads the page automatically
- ✅ Orange color to distinguish from Logout
- ✅ Has a trash icon

This makes testing much easier! Just click it whenever you delete users from the database.

## 📝 Summary

**Problem**: Deleted user from DB but still logged in  
**Cause**: Auth data cached in browser localStorage  
**Solution**: Clear localStorage using any method above  
**Best**: Use the new "Clear Cache (Dev)" button!

Happy testing! 🚀
