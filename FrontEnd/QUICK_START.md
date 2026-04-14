# Quick Start Guide - Estasheer Legal Platform

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd FrontEnd
npm install
```

### 2. Configure Environment
Create `.env.local` file:
```
VITE_API_URL=http://localhost:5128/api
```

### 3. Run Development Server
```bash
npm run dev
```
Visit: **http://localhost:3002**

## 🎯 Test the Application

### As a Client (User)
1. Click "Get Started" or "Sign Up"
2. Fill in your details
3. Select "Client" as role
4. Complete registration
5. Browse lawyers at `/lawyers`
6. Click on a lawyer to view profile
7. Book a consultation
8. View your appointments at `/dashboard`

### As a Lawyer
1. Click "Get Started" or "Sign Up"
2. Fill in your details
3. Select "Lawyer" as role
4. Complete registration
5. Fill in lawyer profile (specialization, rate, bio)
6. View pending appointments at `/dashboard`
7. Approve or cancel appointments
8. Browse other lawyers at `/lawyers`

### Try the AI Assistant
1. Click the purple "AI Assistant" button in navbar
2. Ask questions like:
   - "How do I find a lawyer?"
   - "What are the rates?"
   - "How does booking work?"

## 📱 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with features |
| Browse Lawyers | `/lawyers` | Search and filter lawyers |
| Lawyer Profile | `/lawyer/:id` | View details and book |
| Dashboard | `/dashboard` | Appointments (User or Lawyer view) |
| Account | `/account` | Profile settings |

## 🎨 Features to Explore

✅ **Dark Mode** - Toggle in navbar  
✅ **Animated Background** - Floating legal icons  
✅ **Search & Filters** - Find the perfect lawyer  
✅ **Booking Calendar** - Select date and time  
✅ **Status Management** - Track appointment status  
✅ **AI Chat** - Get instant help  
✅ **Responsive Design** - Works on all devices  

## 🔑 Test Credentials

If you have existing test data in your database, use those credentials. Otherwise, create new accounts through the signup flow.

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run tsc
```

## 📞 Need Help?

Check the full documentation in `IMPLEMENTATION_GUIDE.md` for detailed information about:
- Architecture
- API integration
- Component structure
- User flows
- Customization options

## 🎉 You're Ready!

The application is fully functional with:
- Authentication system
- Lawyer browsing and booking
- Dashboard for both users and lawyers
- AI assistant
- Profile management
- Dynamic animations

Start exploring and enjoy the platform! 🚀
