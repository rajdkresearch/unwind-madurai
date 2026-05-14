# Unwind Madurai — Setup Guide

## Quick Start (Demo Mode — No credentials needed)

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — use **"Try Demo"** on the login page to skip Google OAuth.

---

## Full Setup (Production)

### 1. Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new **OAuth 2.0 Client ID** (Web application)
3. Add Authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
4. Add Authorized redirect URIs:
   - `http://localhost:3000/login/callback`
   - `https://yourdomain.com/login/callback`
5. Copy the **Client ID** into `.env.local`

### 2. Supabase (Database + Auth)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy your **Project URL** and **anon key** from Settings → API

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## Features

| Feature | Status |
|---------|--------|
| 3D Hero Scene (Three.js) | ✅ |
| Google OAuth Login | ✅ |
| Hall/Room Selection | ✅ |
| Time Slot Booking (Lunch/Evening/Dinner) | ✅ |
| Partner Restaurant Menus | ✅ |
| Food Cart & Ordering | ✅ |
| Checkout & Confirmation | ✅ |
| My Bookings / History | ✅ |
| Booking Cancellation | ✅ |
| Mobile Responsive | ✅ |
| Demo Mode (localStorage) | ✅ |

## Note on Zomato/Swiggy Integration

Zomato and Swiggy **do not provide public APIs** for third-party menu or order integration.
The menus are curated from real Madurai restaurants and maintained in `src/lib/data/restaurants.ts`.

To add a new restaurant:
1. Add to `restaurants` array in `restaurants.ts`
2. Add menu items to `menuItems` array
3. No API calls required — all data is local

---

## Deployment (Vercel)

```bash
npx vercel --prod
```

Add the same environment variables in Vercel dashboard → Settings → Environment Variables.
