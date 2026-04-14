# Estasheer Design System

## 🎨 Overview

This is a completely new, modern frontend built from scratch with a focus on:
- Clean, professional aesthetics
- Smooth animations and transitions
- Excellent user experience
- Full dark mode support
- Mobile-first responsive design

## 🌈 Color Palette

### Primary Colors (Gold Theme)
```
primary-50:  #fef9e7  (Lightest)
primary-100: #fdf2c3
primary-200: #fbe89a
primary-300: #f9dd71
primary-400: #f7d453
primary-500: #f5cb35  (Main)
primary-600: #d4af37  (Brand Gold)
primary-700: #b8932f
primary-800: #9c7727
primary-900: #805b1f  (Darkest)
```

### Dark Mode Colors
```
dark-50:  #f7f7f8  (Lightest)
dark-100: #e3e4e6
dark-200: #c7c9cd
dark-300: #a1a4ab
dark-400: #7a7e88
dark-500: #5f636d
dark-600: #4a4d56
dark-700: #3a3d44
dark-800: #2a2c31
dark-900: #1a1b1e
dark-950: #0a0a0b  (Darkest - Main BG)
```

## 📐 Typography

### Font Families
- **Display/Headings**: Poppins (600, 700, 800)
- **Body Text**: Inter (300, 400, 500, 600, 700, 800)

### Font Sizes
```
text-xs:   0.75rem  (12px)
text-sm:   0.875rem (14px)
text-base: 1rem     (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem  (20px)
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)
text-5xl:  3rem     (48px)
text-6xl:  3.75rem  (60px)
text-7xl:  4.5rem   (72px)
```

## 🎭 Components

### Buttons

#### Primary Button
```tsx
<button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all">
  Get Started
</button>
```

#### Secondary Button
```tsx
<button className="px-8 py-4 bg-white dark:bg-dark-800 text-gray-900 dark:text-white rounded-2xl font-semibold border-2 border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-all">
  Learn More
</button>
```

### Cards

#### Feature Card
```tsx
<div className="p-8 bg-white dark:bg-dark-800 rounded-3xl border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-all hover:shadow-2xl">
  {/* Content */}
</div>
```

#### Lawyer Card
```tsx
<div className="bg-white dark:bg-dark-800 rounded-3xl border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-2xl transition-all">
  {/* Content */}
</div>
```

### Inputs

```tsx
<input className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
```

## ✨ Animations

### Available Animations
```css
animate-fade-in      /* Fade in effect */
animate-slide-up     /* Slide up from bottom */
animate-slide-down   /* Slide down from top */
animate-scale-in     /* Scale in effect */
animate-float        /* Floating animation */
```

### Framer Motion Variants

#### Fade In
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

#### Scale In
```tsx
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
```

#### Hover Effects
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## 📱 Responsive Breakpoints

```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

## 🌓 Dark Mode

Dark mode is implemented using Tailwind's `dark:` variant and is controlled by:
1. User preference (localStorage)
2. System preference (prefers-color-scheme)

Toggle dark mode:
```tsx
const toggleTheme = () => {
  if (isDark) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
}
```

## 🎯 Design Principles

1. **Consistency**: Use the same spacing, colors, and patterns throughout
2. **Hierarchy**: Clear visual hierarchy with typography and spacing
3. **Feedback**: Provide visual feedback for all interactions
4. **Accessibility**: Ensure good contrast and keyboard navigation
5. **Performance**: Optimize animations and images
6. **Responsiveness**: Mobile-first approach

## 📦 Spacing Scale

```
0:   0px
1:   0.25rem  (4px)
2:   0.5rem   (8px)
3:   0.75rem  (12px)
4:   1rem     (16px)
6:   1.5rem   (24px)
8:   2rem     (32px)
12:  3rem     (48px)
16:  4rem     (64px)
20:  5rem     (80px)
24:  6rem     (96px)
```

## 🔄 Border Radius

```
rounded-xl:  12px
rounded-2xl: 16px
rounded-3xl: 24px
rounded-full: 9999px
```

## 💫 Shadows

```
shadow-sm:  Small shadow
shadow:     Default shadow
shadow-lg:  Large shadow
shadow-xl:  Extra large shadow
shadow-2xl: 2X large shadow
```

## 🎨 Gradients

### Primary Gradient
```
bg-gradient-to-r from-primary-500 to-primary-700
```

### Text Gradient
```
bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent
```

## 📝 Best Practices

1. **Always use semantic HTML**
2. **Provide alt text for images**
3. **Use proper heading hierarchy**
4. **Ensure sufficient color contrast**
5. **Test on multiple devices**
6. **Optimize images and assets**
7. **Use loading states**
8. **Handle errors gracefully**
9. **Provide keyboard navigation**
10. **Test dark mode thoroughly**

## 🚀 Performance Tips

1. Use `whileInView` for scroll animations
2. Set `viewport={{ once: true }}` to prevent re-animations
3. Lazy load images
4. Use proper image formats (WebP)
5. Minimize bundle size
6. Use code splitting
7. Optimize fonts loading
8. Use CSS transforms for animations
9. Avoid layout shifts
10. Monitor Core Web Vitals
