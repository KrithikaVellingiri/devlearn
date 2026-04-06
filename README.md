# DevLearn

**A modern e-commerce platform for discovering and purchasing tech courses.**

---

## Description

DevLearn is a full-stack course marketplace where users can browse, purchase, and track progress through a curated catalog of technology courses. The platform is designed around a real-world e-commerce flow — from course discovery and filtering through checkout and enrollment — with a clean, performant interface built on the Next.js App Router.

---

## Features

- Browse and search a catalog of tech courses
- Filter courses by category, price range, and rating
- Detailed course pages with curriculum breakdowns and user reviews
- Add to cart and complete a checkout flow
- User authentication via credentials and Google OAuth
- Personal dashboard to view enrolled courses and track learning progress

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Framework and routing |
| TypeScript | Type safety across the codebase |
| Tailwind CSS | Utility-first styling |

### State & Data

| Technology | Purpose |
|---|---|
| Zustand | Global client-side state management |
| TanStack React Query | Server state, caching, and data fetching |

### Backend & Auth

| Technology | Purpose |
|---|---|
| Supabase | Database, storage, and real-time backend |
| NextAuth.js | Authentication with credentials and OAuth providers |

### Other

| Technology | Purpose |
|---|---|
| Axios | HTTP client for API requests |
| Lucide React | Icon library |

### Deployment

| Platform | Purpose |
|---|---|
| Vercel | Hosting and CI/CD |

---

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks (data fetching, UI logic)
├── lib/            # Third-party client setup (Supabase, Auth, Query)
├── services/       # API call abstractions and service layer
└── types/          # Shared TypeScript interfaces and type definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or a compatible package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devlearn.git
cd devlearn

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Important:** Never commit `.env.local` or any file containing secret keys to version control. The `.gitignore` already excludes `.env*.local` by default.

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the required environment variables in the Vercel project settings.
4. Deploy.

Vercel will automatically handle builds and deployments on every push to the main branch.

---

## Future Improvements

- Integrated payment processing via Stripe
- User-submitted course reviews and ratings
- Personalized course recommendations based on enrollment history
- Instructor dashboard for course creation and analytics
- Wishlists and saved courses
- Certificate generation on course completion
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
