# Vivah App — Claude Code Reference

## Project Overview
A modern Indian matrimonial web application built with Next.js 15 (App Router). The name "Vivah" means "marriage" in Sanskrit/Hindi.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, `src/` directory) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + Shadcn UI |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | Supabase (PostgreSQL + Realtime) |
| i18n | next-intl |
| Icons | lucide-react |
| Payments | Razorpay (to be integrated) |

## Design Rules (MUST follow on every page)
1. **Full-page background image** from Unsplash — each page gets its own unique image
2. **Semi-transparent dark gradient overlay** on top for text readability (`bg-black/50` or similar)
3. **Mobile-first**, fully responsive (Tailwind breakpoints: sm, md, lg, xl)
4. **Color theme**: deep red `#C0392B` + gold `#F39C12` + white

## Environment Variables Required
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# next-intl
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

## Directory Structure
```
vivah-app/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── [locale]/           # i18n locale wrapper
│   │   │   ├── (public)/       # Public routes (no auth required)
│   │   │   │   ├── page.tsx            # Landing page
│   │   │   │   ├── login/page.tsx      # Login
│   │   │   │   ├── register/page.tsx   # Registration
│   │   │   │   └── stories/page.tsx    # Success stories (public)
│   │   │   └── (protected)/    # Auth-protected routes
│   │   │       ├── dashboard/page.tsx
│   │   │       ├── onboarding/page.tsx
│   │   │       ├── profiles/page.tsx
│   │   │       ├── profiles/[id]/page.tsx
│   │   │       ├── interests/page.tsx
│   │   │       ├── messages/page.tsx
│   │   │       ├── messages/[id]/page.tsx
│   │   │       ├── notifications/page.tsx
│   │   │       ├── premium/page.tsx
│   │   │       ├── settings/page.tsx
│   │   │       ├── settings/privacy/page.tsx
│   │   │       └── admin/page.tsx
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── layout/             # Navbar, Footer, Sidebar
│   │   └── shared/             # Reusable app components
│   ├── lib/
│   │   ├── supabase.ts         # Supabase clients
│   │   └── utils.ts            # Shadcn utils
│   └── middleware.ts           # Clerk auth middleware
├── supabase/
│   └── schema.sql              # Full PostgreSQL schema
├── messages/                   # next-intl translation files
│   ├── en.json
│   └── hi.json
└── public/
```

## All 20 Pages

### Public (no auth required)
1. **`/` — Landing Page**: Hero section, tagline, CTA to register. Full-page wedding background.
2. **`/login` — Login**: Clerk SignIn component with branded overlay.
3. **`/register` — Register**: Clerk SignUp component with branded overlay.
4. **`/stories` — Success Stories**: Grid of approved couple stories. Heartwarming background.

### Protected (auth required via Clerk middleware)
5. **`/dashboard` — Dashboard**: Match recommendations feed, quick stats, online users. Warm-tone background.
6. **`/onboarding` — Onboarding**: Multi-step profile creation wizard (personal info → photos → preferences).
7. **`/profiles` — Browse Profiles**: Filterable profile grid (religion, caste, location, age). Elegant background.
8. **`/profiles/[id]` — Profile Detail**: Full profile view, send interest, icebreaker, report.
9. **`/interests` — My Interests**: Tabs for sent/received interests with accept/reject actions.
10. **`/messages` — Inbox**: List of conversations with unread badges. Realtime via Supabase.
11. **`/messages/[id]` — Chat**: Real-time chat UI with message bubbles. Supabase Realtime subscription.
12. **`/notifications` — Notifications**: All alerts (interest received, accepted, new message, etc.).
13. **`/premium` — Premium Plans**: Pricing cards (Basic / Gold / Platinum). Razorpay integration.
14. **`/settings` — Account Settings**: Edit profile info, photo upload, language selector.
15. **`/settings/privacy` — Privacy Settings**: Toggle profile visibility, block list, data controls.
16. **`/admin` — Admin Panel**: Verify profiles, moderate reports, approve stories, manage users.

### Utility / System Pages (implicit)
17. **`/not-found`** — Custom 404 page
18. **`/error`** — Error boundary page
19. **`/loading`** — Global loading skeleton
20. **`/api/webhooks/clerk`** — Clerk webhook to auto-create Supabase profile on sign-up

## Database Schema (supabase/schema.sql)
- **profiles** — Core user data (clerk_id FK, demographics, photos, premium status, credits)
- **interests** — Connection requests between users (pending/accepted/rejected/expired)
- **messages** — Direct messages with read receipts
- **notifications** — In-app notification feed
- **reports** — User report/moderation queue
- **success_stories** — Approved couple testimonials
- **subscriptions** — Premium plan purchase records (Razorpay)
- **profile_views** — Track who viewed whose profile

## Auth Flow
1. User signs up via Clerk → `/register`
2. Clerk webhook fires → creates row in `profiles` table with `clerk_id`
3. Middleware redirects new users to `/onboarding` to complete profile
4. After onboarding, redirects to `/dashboard`

## i18n
- Supported locales: `en` (English), `hi` (Hindi)
- Translation files in `/messages/`
- next-intl configured in `next.config.ts`

## Key Conventions
- Server Components by default; add `"use client"` only when needed
- Supabase browser client for client components, admin client for server actions
- All Supabase queries go through typed helpers in `src/lib/`
- Image uploads go to Supabase Storage bucket `profile-photos`
- Use Shadcn components from `src/components/ui/`
