# SaaSify Frontend Shortlisting Project

A single-page web app implementing:
- Pixel-inspired SaaS landing homepage
- Fake auth flow with protected routes
- API-powered dashboard/users/settings experience

> Note: Due to package registry restrictions in this environment, this implementation uses vanilla HTML/CSS/JS while preserving the required product behavior.

## Live-style Local Setup

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Features Checklist

### Part A: Landing Page
- [x] Hero, features, pricing, testimonials, CTA, footer
- [x] Consistent spacing/typography/button system
- [x] Hover + focus states
- [x] Responsive behavior without horizontal overflow

### Part B: Auth
- [x] `/login` and `/signup` routes
- [x] Fake auth token in `localStorage`
- [x] Protected dashboard routes
- [x] Logout clears token

### Part C: Dashboard + API
- [x] `/dashboard` summary cards from users API
- [x] `/users` list with:
  - [x] Search (name/email)
  - [x] Sort (A-Z / Z-A)
  - [x] Pagination (client-side)
  - [x] User detail modal
- [x] `/settings` profile form + theme toggle
- [x] Settings persistence in `localStorage`
- [x] Loading/error/empty states

## Structure

- `index.html` - root shell
- `styles.css` - design system + responsive styles
- `app.js` - hash router, auth, page rendering, API integration

## Screenshots

Add screenshots after running locally.

## Decisions / Tradeoffs

1. **No framework install possible** in this environment (npm registry blocked), so architecture was implemented in modular vanilla JS with component-like rendering functions.
2. **Hash routing** is used to simulate multi-page behavior while keeping static deployment simple.
3. **Local state + localStorage** chosen to satisfy fake auth and settings persistence quickly and reliably.
