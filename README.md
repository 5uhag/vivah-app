# PyaarMatch 💕

> India's most trusted matrimonial platform — built with Next.js 16, Clerk, Supabase, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 + Shadcn UI | ^4 |
| Auth | Clerk | ^7.2.0 |
| Database | Supabase (PostgreSQL + Realtime) | ^2.103.0 |
| SSR Client | @supabase/ssr | ^0.10.2 |
| i18n | next-intl | ^4.9.1 |
| Icons | lucide-react | ^1.8.0 |
| Webhooks | svix | ^1.90.0 |
| UI Primitives | @base-ui/react | ^1.4.0 |

---

## Design System

- **Brand:** PyaarMatch 💕
- **Primary:** `#E91E8C` (hot pink)
- **Accent:** `#F8A4C8` (baby pink)
- **Overlays:** `bg-pink-950/40` + `backdrop-blur-md`
- **Cards:** `bg-white/20 backdrop-blur-md rounded-2xl`
- **Buttons:** `rounded-full` hot pink
- **Backgrounds:** Unique full-viewport Unsplash image per page
- **Layout:** Mobile-first, fully responsive

---

## Pages (20 Total)

### Public
| Route | Page |
|-------|------|
| `/` | Landing — hero, stats, features, success stories |
| `/login` | Clerk SignIn with branded overlay |
| `/register` | Clerk SignUp with branded overlay |
| `/stories` | Success stories grid + submit modal |

### Protected (requires Clerk auth)
| Route | Page |
|-------|------|
| `/dashboard` | Match feed, AI picks, stats, online users |
| `/onboarding` | 5-step profile creation wizard |
| `/search` | Browse profiles — sidebar filters, AI badges, pagination |
| `/profile/[id]` | Full profile view — tabs, photos, send interest |
| `/profile/edit` | Edit profile — tabs, photo upload, completion % |
| `/interests` | Received / Sent / Accepted tabs, expiry countdown |
| `/chat` | Conversation list with unread badges |
| `/chat/[id]` | Real-time chat UI — sent/received bubbles |
| `/contacts` | Unlock contact details with credits, profile viewers |
| `/notifications` | Grouped notifications, mark all read |
| `/subscription` | Free / Premium / Gold plan cards, Razorpay placeholder |
| `/settings` | Account, Privacy, Notifications, Security toggles |
| `/history` | Match history with status badges, Favourites grid |
| `/admin` | Admin panel — verify users, moderate reports, approve stories |

### System
| Route | File |
|-------|------|
| `/_not-found` | `src/app/not-found.tsx` |
| `/error` | `src/app/error.tsx` |
| `/loading` | `src/app/loading.tsx` |
| `/api/webhooks/clerk` | Clerk webhook — auto-creates Supabase profile on sign-up |

---

## Shadcn UI Components Installed

`avatar` `badge` `button` `card` `dialog` `input` `label` `progress` `select` `separator` `sheet` `slider` `switch` `table` `tabs` `textarea` `tooltip`

---

## Database Schema

Located at [`supabase/schema.sql`](supabase/schema.sql).

| Table | Purpose |
|-------|---------|
| `profiles` | Core user data — clerk_id, demographics, photos, premium, credits |
| `interests` | Connection requests (pending / accepted / rejected / expired) |
| `messages` | Direct messages with read receipts |
| `notifications` | In-app notification feed |
| `reports` | User report & moderation queue |
| `success_stories` | Couple testimonials with approval workflow |
| `subscriptions` | Premium plan purchases (Razorpay) |
| `profile_views` | Who viewed whose profile |

---

## Environment Variables

Create `.env.local` (already in `.gitignore`):

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Auth Flow

1. User signs up → `/register` (Clerk)
2. Clerk fires `user.created` webhook → `/api/webhooks/clerk`
3. Webhook creates row in `profiles` table with `clerk_id`
4. Middleware redirects new users to `/onboarding`
5. After onboarding completes → `/dashboard`

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing
│   ├── layout.tsx                # Root layout (ClerkProvider)
│   ├── not-found.tsx             # Custom 404
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Global loader
│   ├── login/                    # Clerk SignIn
│   ├── register/                 # Clerk SignUp
│   ├── dashboard/                # Main feed
│   ├── onboarding/               # 5-step wizard
│   ├── search/                   # Browse + filters
│   ├── profile/[id]/             # Profile detail
│   ├── profile/edit/             # Edit profile
│   ├── interests/                # Interest management
│   ├── chat/                     # Inbox
│   ├── chat/[id]/                # Chat detail
│   ├── contacts/                 # Unlock contacts
│   ├── notifications/            # Notification feed
│   ├── subscription/             # Pricing plans
│   ├── settings/                 # Account settings
│   ├── history/                  # Match history + favourites
│   ├── stories/                  # Success stories
│   ├── admin/                    # Admin panel
│   └── api/webhooks/clerk/       # Clerk webhook handler
├── components/
│   └── ui/                       # Shadcn components
├── lib/
│   ├── supabase.ts               # Supabase browser + admin clients
│   └── utils.ts                  # cn() utility
└── proxy.ts                      # Clerk auth middleware
supabase/
└── schema.sql                    # Full PostgreSQL schema
```
