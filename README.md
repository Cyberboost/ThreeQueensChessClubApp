# Three Queens Chess Club — Application

> **Repository scope:** This is the **authenticated application platform** for Three Queens Chess Club. It is not the public marketing website. Public-facing pages, SEO content, waitlists, and landing pages live in a separate repository.

---

## Product Overview

**Three Queens Chess Club** is an AI-powered virtual chess club for girls. Inspired by three sisters — Ariyah, Aliviyah, and Roniyah Reeves — it's built to help girls play chess, learn strategy, grow in confidence, and have fun in a safe and premium environment.

The platform combines:
- Live player vs player chess
- AI opponent play (Stockfish-powered)
- AI-guided training mode
- Adaptive skill assessment and level recommendations
- Guardian-managed child profiles with parental controls
- Safe community features
- Rewards, achievements, and progression

---

## Brand

Three Queens Chess Club is a **Black girl-owned and powered** brand.

Design philosophy:
- Girl-centered, smart, bold, polished
- Rich jewel tones (violet, amber, emerald, sapphire, ruby)
- Warm, imaginative, and premium — not generic
- Safe and age-appropriate

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui components |
| ORM | Prisma |
| Database | Neon Postgres (serverless) |
| Authentication | Clerk |
| Chess Logic | chess.js |
| Realtime (planned) | Ably |
| AI Engine (planned) | Stockfish (WASM or API) |
| Deployment | Vercel |

---

## Architecture Overview

```
src/
├── app/
│   ├── (auth)/               # Unauthenticated auth entry routes
│   │   ├── sign-in/          # Clerk sign-in page
│   │   ├── sign-up/          # Clerk sign-up page
│   │   └── onboarding/       # Post-signup guardian onboarding
│   ├── (app)/                # Authenticated application area
│   │   ├── dashboard/        # Main dashboard
│   │   ├── play/             # Player vs player mode
│   │   ├── play-ai/          # Player vs AI mode
│   │   ├── training/         # Training and coaching mode
│   │   ├── profile/          # Player profile and achievements
│   │   └── parent/           # Guardian/parent controls
│   ├── (admin)/              # Admin area (role-protected)
│   │   └── admin/
│   │       └── dashboard/
│   └── api/
│       ├── health/           # Health check endpoint
│       └── webhooks/clerk/   # Clerk user sync webhook
├── components/
│   ├── ui/                   # Design system primitives
│   ├── layout/               # App shell components (sidebar, navbar)
│   └── dashboard/            # Dashboard-specific components
├── lib/
│   ├── auth/                 # Auth helpers, role guards
│   ├── db/                   # Prisma client + query functions
│   ├── chess/                # chess.js utilities + Stockfish placeholder
│   ├── ai/                   # AI coaching placeholder
│   ├── realtime/             # Realtime integration placeholder (Ably)
│   └── utils/                # General utilities
├── types/                    # Shared TypeScript types
│   ├── chess.ts              # Chess domain types
│   └── app.ts                # App-level types
├── config/                   # App constants and configuration
└── middleware.ts             # Clerk auth middleware + role-based guards
prisma/
└── schema.prisma             # Full data model
```

### Auth Model

Authentication uses **Clerk** for:
- Guardian (adult) account auth
- Session management
- OAuth support

Child profiles are **not** independent user accounts. They are data entities owned by a guardian. The architecture:
- Guardian signs in via Clerk
- Guardian manages one or more `ChildProfile` records
- App context tracks which child profile is active
- Permissions and safety settings are guardian-controlled

### Role System

| Role | Description |
|---|---|
| `GUARDIAN` | Default role. Can manage child profiles and play |
| `ADMIN` | Platform administrators. Access to admin area |

---

## Data Model Summary

| Model | Purpose |
|---|---|
| `User` | Guardian account, linked to Clerk |
| `GuardianSettings` | Per-guardian safety/control preferences |
| `ChildProfile` | Child player profile under a guardian |
| `PlayerRatingProfile` | Current skill level and game stats |
| `SkillAssessment` | Point-in-time skill evaluations |
| `AILevelRecommendation` | AI-generated difficulty recommendations |
| `Match` | A chess game (PvP, PvAI, or Training) |
| `MatchParticipant` | Links a child to a match with their color/result |
| `Move` | Individual moves within a match |
| `TrainingSession` | A coaching/training session |
| `Achievement` | Achievement definitions |
| `ChildAchievement` | Unlocked achievements per child |
| `Theme` | Board/piece theme packs |
| `ChildThemeSelection` | Active theme per child |
| `FriendInvite` | Friend requests between child profiles |
| `ModerationEvent` | Platform moderation records |

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon Postgres connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | ✅ | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | ✅ | `/onboarding` |
| `NEXT_PUBLIC_APP_URL` | ✅ | App base URL |
| `ABLY_API_KEY` | ⬜ | Ably realtime key (when implemented) |
| `STOCKFISH_API_KEY` | ⬜ | Stockfish API key (when implemented) |

> Production and preview variables are managed in **Vercel Project Settings**. Never commit real values.

---

## Local Development

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)
- A Neon Postgres database
- A Clerk account

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local
# Fill in your values in .env.local

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to your database
npm run db:push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database Commands

```bash
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes (dev only)
npm run db:migrate       # Create a migration
npm run db:migrate:deploy # Apply migrations (production)
npm run db:studio        # Open Prisma Studio
```

### Code Quality

```bash
npm run typecheck        # TypeScript type check
npm run lint             # ESLint
npm run format           # Prettier format
npm run format:check     # Prettier check
```

---

## Auth Setup (Clerk)

1. Create a project at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copy your Publishable Key and Secret Key to `.env.local`
3. Configure redirect URLs in Clerk Dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/onboarding`
4. Set up the Clerk Webhook (for DB sync):
   - Add endpoint: `https://your-domain/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`
   - Add `svix` package and enable signature verification before production

---

## Deployment (Vercel + Neon)

### Vercel

1. Connect your GitHub repository in the Vercel dashboard
2. Add all required environment variables in **Project Settings → Environment Variables**
3. Set variables for both **Production** and **Preview** environments
4. Deploy — Vercel handles the rest

### Neon Postgres

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string to `DATABASE_URL`
3. Run `npm run db:migrate:deploy` to apply migrations on first deploy

> **Note:** Prisma is configured for direct connections. If using Neon's connection pooling, consider adding `pgBouncer=true` to your connection string or using Prisma Accelerate.

---

## Planned Implementation Roadmap

In priority order:

1. **Guardian onboarding** — Create first child profile flow, intro UX
2. **Child profile creation** — Form, avatar, date of birth, name
3. **Dashboard polish** — Profile switcher, recent games, streaks
4. **Initial skill assessment** — Short puzzle/game to estimate starting level
5. **Live game room** — Chess board UI, move validation, game state
6. **AI opponent (Stockfish)** — WASM or API integration, difficulty levels
7. **Training mode UX** — Real-time hints, move explanations, coaching overlay
8. **Rating system** — Elo-based or custom rating after each match
9. **Achievement system** — Define + unlock achievements automatically
10. **Realtime PvP** — Ably integration, matchmaking, live opponent play
11. **Guardian controls** — Daily limits, chat toggle, activity review
12. **Moderation tools** — Admin moderation queue, flag review
13. **Theme system** — Custom board/piece themes per child
14. **Friend invites** — Guardian-approved friend connections
15. **Subscription/billing** — Stripe integration for premium features

---

## Contributing

This is a private startup repository. Internal contribution guidelines will be added as the team grows.

---

*Built with care for the next generation of chess queens.*
