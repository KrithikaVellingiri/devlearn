# DevLearn — Precision-Engineered Technical Education

> *Learn. Build. Grow. The platform engineered for the modern software architect.*

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-success?style=for-the-badge&logo=vercel)](https://devlearn-two.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

DevLearn is a modern, full-stack educational platform built from the ground up for developers and software engineers. Moving beyond generic course catalogs, DevLearn offers a structured, hands-on learning experience focused on advanced technical domains such as Distributed Systems, Microservices Architecture, and System Design.

Designed with a premium, dual-mode (Light/Dark) aesthetic and engineered for performance, this platform serves as an interactive curriculum hub equipped with progress tracking, achievement systems, and secure commerce workflows.

---

## ✨ Key Features

- **Advanced Curriculum Delivery:** Structured learning paths for complex topics (e.g., Kafka Event Streaming, Scalable Go Microservices).
- **Comprehensive E-Commerce Flow:** Robust cart and checkout system with strict enrollment verification to prevent redundant course purchases.
- **Dynamic Learning Dashboard:** Personalized student overview featuring streaks, achievements, and course progress tracking.
- **Premium Dual-Mode UI/UX:** Precision-crafted dark and light mode aesthetics utilizing advanced Tailwind CSS utility classes for optimal readability, high contrast, and a sleek developer-focused UI.
- **Robust Authentication:** Secure session management and user authentication powered by Next-Auth and Supabase.
- **Responsive Architecture:** Fully responsive layout with mobile-optimized slide-over navigation and adaptive grid layouts.

## 🛠️ Tech Stack

### Frontend & Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)

### State Management & Data Fetching
- **Client State:** [Zustand](https://zustand-demo.pmnd.rs/) for lightweight, scalable local state.
- **Server State:** [TanStack React Query](https://tanstack.com/query/latest) for declarative, cached data fetching.

### Backend, Auth & Database
- **Database / BaaS:** [Supabase](https://supabase.com/)
- **Authentication:** [Next-Auth](https://next-auth.js.org/)

### UI Utilities
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

## 📸 Screenshots

*(Replace placeholders with actual project screenshots)*

| Dashboard Overview | Course Details |
| :---: | :---: |
| ![Dashboard Overview Placeholder](./public/screenshots/dashboard.png) | ![Course Placeholder](./public/screenshots/course-page.png) |

| Learning Paths | Dark/Light Mode |
| :---: | :---: |
| ![Learning Path Placeholder](./public/screenshots/learning-path.png) | ![Theme Placeholder](./public/screenshots/theme-toggle.png) |

## 📂 Project Structure

```text
devlearn/
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── auth/            # Login, Signup, Session management
│   │   ├── cart/            # Shopping cart flow
│   │   ├── courses/         # Course catalog and individual course pages
│   │   ├── dashboard/       # User learning dashboard
│   │   ├── learning-path/   # Curated curriculum paths
│   │   └── ...
│   ├── components/          # Reusable UI components
│   │   ├── course/          # Course-specific modular components
│   │   ├── layout/          # Navbar, Sidebar, Footer, Cards
│   │   ├── sections/        # Page sections (Hero, Features, etc.)
│   │   └── ui/              # Primitive components (Buttons, Inputs, etc.)
│   └── types/               # Global TypeScript definitions
├── public/                  # Static assets (images, icons)
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v20+)
- npm or yarn
- A Supabase account

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/devlearn.git
   cd devlearn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the necessary variables:
   ```env
   # Next Auth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 Engineering Challenges & Learning Outcomes

- **Dual-Mode UI Architecture:** Transitioning from a hardcoded dark-mode to a fully responsive, dual-theme architecture required careful restructuring of CSS variables and Tailwind utility classes. This ensured optimal contrast and readability in light mode while maintaining a premium dark mode aesthetic without duplicating components.
- **E-Commerce Data Integrity:** Implementing strict enrollment verification to prevent redundant course purchases. This involved complex state synchronization between the cart (Zustand), server data (React Query), and the database (Supabase) to gracefully handle edge cases and provide real-time user feedback via toasts.
- **Client/Server Component Hybridization:** Maximizing performance in Next.js 16 by strategically splitting components into server-rendered pages for SEO/speed and client-side components for interactivity (e.g., shopping cart, theme toggling).

## 🔮 Future Improvements

- **Interactive Code Environments:** Integrating web-based sandboxes (like WebContainers) for true "Learn by Building" capabilities directly in the browser.
- **AI-Powered Recommendations:** Implementing personalized course suggestions based on user completion data and career goals.
- **B2B / Enterprise Portal:** Creating specialized dashboard views for team managers to track employee upskilling metrics.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/devlearn/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with precision and passion for the developer community.*
