# PyaarMatch 💕 — Claude Code Reference

## Brand & Theme
- **Name:** PyaarMatch 💕
- **Primary color:** `#E91E8C` (hot pink)
- **Accent color:** `#F8A4C8` (baby pink)
- **Overlay:** `bg-pink-950/40` on all backgrounds
- **Cards:** `bg-white/20 backdrop-blur-md rounded-2xl border border-white/10`
- **Buttons:** `rounded-full` with `bg-[#E91E8C]` hot pink
- **Every page** has a unique full-viewport Unsplash background image + `bg-pink-950/40` overlay

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.3 (App Router, `src/` dir) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + Shadcn UI (base-ui primitives) |
| Auth | Clerk (`@clerk/nextjs` v7) |
| Database | Supabase (PostgreSQL + Realtime) |
| SSR Client | `@supabase/ssr` |
| i18n | next-intl v4 |
| Icons | lucide-react |
| Webhooks | svix (Clerk webhook verification) |

## All 20 Pages — Built ✅

### Public
| # | Route | File | Description |
|---|-------|------|-------------|
| 1 | `/` | `src/app/page.tsx` | Landing — hero, stats, 6 feature cards, 3 story previews, footer |
| 2 | `/login` | `src/app/login/page.tsx` | Clerk `<SignIn />` with pink branded overlay |
| 3 | `/register` | `src/app/register/page.tsx` | Clerk `<SignUp />` with pink branded overlay |
| 4 | `/stories` | `src/app/stories/page.tsx` | 4 story cards + submit modal (Dialog) |

### Protected
| # | Route | File | Description |
|---|-------|------|-------------|
| 5 | `/dashboard` | `src/app/dashboard/page.tsx` | Stats, online users, AI match grid, profile completion nudge |
| 6 | `/onboarding` | `src/app/onboarding/page.tsx` | 5-step wizard: Personal → Background → Career → Preferences → Photos |
| 7 | `/search` | `src/app/search/page.tsx` | Filter sidebar (age slider, religion, profession), AI badge cards, pagination |
| 8 | `/profile/[id]` | `src/app/profile/[id]/page.tsx` | Photo, tabs (Personal/Education/Job/Family), photo grid, Send Interest/Chat/Contact |
| 9 | `/profile/edit` | `src/app/profile/edit/page.tsx` | Tabs (Personal/Education/Job/Family/Photos), completion %, photo upload grid |
| 10 | `/interests` | `src/app/interests/page.tsx` | Tabs: Received (Accept/Reject) / Sent (status badge) / Accepted — expiry countdown |
| 11 | `/chat` | `src/app/chat/page.tsx` | Conversation list, search bar, unread badges, online dots |
| 12 | `/chat/[id]` | `src/app/chat/[id]/page.tsx` | Real-time chat — sent (pink right) / received (dark left), fixed input + send |
| 13 | `/contacts` | `src/app/contacts/page.tsx` | Credits counter, locked/unlocked contact cards, profile viewers section |
| 14 | `/notifications` | `src/app/notifications/page.tsx` | Typed notifs (match/interest/message/system), mark all read, unread pink border |
| 15 | `/subscription` | `src/app/subscription/page.tsx` | Free / Premium ₹999 / Gold ₹1999 plan cards, Razorpay placeholder |
| 16 | `/settings` | `src/app/settings/page.tsx` | Sections: Account / Privacy / Notifications / Security — toggles, password form, 2FA, delete tooltip |
| 17 | `/history` | `src/app/history/page.tsx` | Match History (status badges) + Favourites grid, success rate stat |
| 18 | `/admin` | `src/app/admin/page.tsx` | Stats cards, Users table (verify toggle), Reports (resolve), Stories (approve/reject) |

### System
| # | File | Description |
|---|------|-------------|
| 19 | `src/app/not-found.tsx` | Custom 404 with nav links |
| 20 | `src/app/error.tsx` | Error boundary with retry + home |
| — | `src/app/loading.tsx` | Global spinner overlay |
| — | `src/app/api/webhooks/clerk/route.ts` | `user.created` → insert profile, `user.deleted` → delete profile |

## Auth Flow
1. Sign up → `/register` → Clerk
2. `user.created` webhook → `POST /api/webhooks/clerk` → Supabase `profiles` insert
3. `proxy.ts` middleware protects all routes except `/`, `/login`, `/register`, `/stories`
4. New users redirect to `/onboarding` → after completion → `/dashboard`

## Environment Variables
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Shadcn UI Components Installed
`avatar` `badge` `button` `card` `dialog` `input` `label` `progress` `select` `separator` `sheet` `slider` `switch` `table` `tabs` `textarea` `tooltip`

> All use `@base-ui/react` primitives. Does NOT support `asChild` prop — pass className directly to `DialogTrigger` / `TooltipTrigger`.

## Database Schema (`supabase/schema.sql`)
| Table | Key Columns |
|-------|-------------|
| `profiles` | `id`, `clerk_id`, `full_name`, `gender`, `dob`, `phone`, `location`, `religion`, `caste`, `profession`, `education`, `about`, `profile_photo`, `photos[]`, `completion_score`, `is_verified`, `is_premium`, `credits`, `language`, `is_hidden`, `online_status` |
| `interests` | `id`, `sender_id→profiles`, `receiver_id→profiles`, `status`, `icebreaker`, `expires_at` |
| `messages` | `id`, `sender_id→profiles`, `receiver_id→profiles`, `content`, `is_read` |
| `notifications` | `id`, `user_id→profiles`, `type`, `message`, `is_read` |
| `reports` | `id`, `reporter_id→profiles`, `reported_id→profiles`, `reason`, `status` |
| `success_stories` | `id`, `user1_id→profiles`, `user2_id→profiles`, `story`, `photo`, `is_approved` |
| `subscriptions` | `id`, `user_id→profiles`, `plan`, `razorpay_order_id`, `expires_at` |
| `profile_views` | `id`, `viewer_id→profiles`, `viewed_id→profiles`, `viewed_at` |

## Supabase Clients (`src/lib/supabase.ts`)
- `supabase` — browser client (nullable, use in `"use client"` components)
- `supabaseAdmin` — server/admin client (nullable, use in Server Components / API routes)
- Both return `null` if env vars are not set (safe for build without env)

## Key Conventions
- Server Components by default; add `"use client"` when using state, events, or browser APIs
- `Select.onValueChange` callback receives `string | null` — always use `(v) => set(v ?? "default")`
- `Slider.onValueChange` callback receives `number | readonly number[]` — cast with `Array.isArray(v) ? [...v] : [v as number]`
- `DialogTrigger` / `TooltipTrigger` do NOT support `asChild` — apply className directly
- Images from Unsplash require `next.config.ts` remote pattern for `images.unsplash.com`
- Photo uploads use `URL.createObjectURL()` for preview; wire to Supabase Storage `profile-photos` bucket when connecting backend
- Razorpay: placeholder `alert()` in `/subscription` — replace with Razorpay SDK order creation
- Clerk webhook secret must be set as `CLERK_WEBHOOK_SECRET` in env and registered in Clerk dashboard

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── layout.tsx            # ClerkProvider wrapper
│   ├── not-found.tsx         # 404
│   ├── error.tsx             # Error boundary
│   ├── loading.tsx           # Global loader
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── onboarding/
│   ├── search/
│   ├── profile/[id]/
│   ├── profile/edit/
│   ├── interests/
│   ├── chat/
│   ├── chat/[id]/
│   ├── contacts/
│   ├── notifications/
│   ├── subscription/
│   ├── settings/
│   ├── history/
│   ├── stories/
│   ├── admin/
│   └── api/webhooks/clerk/   # route.ts
├── components/ui/            # Shadcn components
├── lib/
│   ├── supabase.ts
│   └── utils.ts
└── proxy.ts                  # Clerk middleware
supabase/
└── schema.sql
```
