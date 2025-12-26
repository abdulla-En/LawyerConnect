# Frontend Development Guidelines

## Before Modifying Frontend Files

When working with files in `FrontEnd/src/`:

1. **Check git status first** - Run `git status` to see current state before making changes
2. **Prefer minimal fixes** - When fixing errors (like unused imports), make the smallest change possible rather than rewriting entire files
3. **Preserve existing features** - The frontend has many integrated features:
   - Dark mode toggle
   - Logo display
   - Language toggle (i18n)
   - AI chat integration
   - React Router navigation
4. **Use git restore if needed** - If changes break functionality, restore from git: `git checkout HEAD -- <file>`

## Key Frontend Structure

- Pages are in `FrontEnd/src/pages/` (not `FrontEnd/src/components/pages/`)
- Components are in `FrontEnd/src/components/`
- Routes: `/`, `/lawyers`, `/lawyer/:id`, `/dashboard`, `/account`

## Common Pitfalls to Avoid

- Don't remove imports that appear unused without checking if they're used dynamically
- Don't rewrite App.tsx or Navbar.tsx without understanding all their features
- Don't change routing structure without verifying all routes still work
