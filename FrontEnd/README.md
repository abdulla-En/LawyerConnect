# Estasheer - Modern Legal Consultation Platform

A completely redesigned, modern frontend for the Estasheer legal consultation platform built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dark Mode**: Full dark mode support with elegant transitions
- **Responsive**: Mobile-first design that works on all devices
- **Animated**: Smooth animations using Framer Motion
- **Accessible**: Built with accessibility in mind
- **Fast**: Optimized performance with Vite

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the FrontEnd2 directory:
```bash
cd FrontEnd2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3002`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
FrontEnd2/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar with theme toggle
│   │   ├── Hero.tsx             # Hero section with animations
│   │   ├── Features.tsx         # Features showcase
│   │   ├── LawyersSection.tsx   # Lawyers listing
│   │   ├── HowItWorks.tsx       # Process explanation
│   │   ├── Testimonials.tsx     # Client testimonials
│   │   ├── CTASection.tsx       # Call-to-action section
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── LoginModal.tsx       # Login modal
│   │   └── SignupModal.tsx      # Signup modal
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Color Scheme

### Light Mode
- Primary: Gold (#f5cb35, #d4af37)
- Background: White with subtle gradients
- Text: Dark gray (#1a1b1e)

### Dark Mode
- Primary: Gold (#f5cb35, #d4af37)
- Background: Deep dark (#0a0a0b, #1a1b1e)
- Text: Light gray (#f7f7f8)

## 🔧 Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons

## 📝 Key Features

1. **Animated Hero Section**: Eye-catching hero with floating cards
2. **Feature Cards**: Showcase platform capabilities
3. **Lawyer Profiles**: Display lawyer information with ratings
4. **How It Works**: Step-by-step process explanation
5. **Testimonials**: Social proof from satisfied clients
6. **CTA Section**: Compelling call-to-action
7. **Modals**: Login and signup modals with smooth animations
8. **Dark Mode**: Toggle between light and dark themes
9. **Responsive**: Works perfectly on mobile, tablet, and desktop

## 🔄 Next Steps

To integrate with the backend:

1. Copy the API service from FrontEnd/src/services/api.ts
2. Copy the types from FrontEnd/src/types/index.ts
3. Copy the AuthContext from FrontEnd/src/contexts/AuthContext.tsx
4. Update the modals to use the actual authentication logic
5. Create pages for:
   - Browse Lawyers (with filters)
   - Lawyer Profile Detail
   - Booking System
   - User Dashboard
   - Lawyer Dashboard

## 📄 License

This project is part of the Estasheer legal consultation platform.

## 🤝 Contributing

This is a fresh start with modern design principles. Feel free to customize and extend!
