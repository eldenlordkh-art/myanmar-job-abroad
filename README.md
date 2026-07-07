# MyanmarJobs — Modern Job Board

A modern, responsive job board for Myanmar built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Firebase (Auth + Firestore)**. Includes a public job board and a password-protected admin dashboard for managing listings.

## Features

- 🏠 Home page with hero search and featured jobs
- 📋 Job listing page with search + filters (title, location, category, type)
- 📄 Job details page with apply-by-email / apply-by-URL
- 🏢 Companies page (auto-derived from active job postings)
- ✉️ Contact page
- 🔐 Admin-only login (Firebase Authentication, email/password)
- 🛠️ Admin dashboard: create, edit, delete jobs (Firestore)
- 🌙 Dark mode (class-based, persisted to localStorage)
- 📱 Fully responsive (mobile-first)
- 🔍 SEO: metadata, Open Graph tags, `robots.txt`, dynamic `sitemap.xml`
- 🧱 Reusable components: `Navbar`, `Footer`, `JobCard`, `SearchBar`, `JobForm`, `Loader`, `ProtectedRoute`, `ThemeToggle`

## Tech Stack

| Layer      | Tech                                  |
|------------|----------------------------------------|
| Framework  | Next.js 14 (App Router) + TypeScript   |
| Styling    | Tailwind CSS                          |
| Auth       | Firebase Authentication (email/password) |
| Database   | Cloud Firestore                       |
| Hosting    | Vercel                                |

## Folder Structure

```
myanmar-job-board/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout, metadata, providers
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css
│   │   ├── robots.ts                 # robots.txt
│   │   ├── sitemap.ts                # dynamic sitemap.xml
│   │   ├── not-found.tsx             # custom 404
│   │   ├── jobs/
│   │   │   ├── page.tsx              # Suspense wrapper
│   │   │   ├── JobsPageContent.tsx   # listing + filters
│   │   │   └── [id]/page.tsx         # job details
│   │   ├── companies/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── login/page.tsx            # admin login
│   │   └── admin/
│   │       ├── page.tsx              # dashboard (list/delete)
│   │       └── jobs/
│   │           ├── new/page.tsx      # create job
│   │           └── [id]/edit/page.tsx
│   ├── components/                   # reusable UI components
│   └── lib/
│       ├── firebase.ts               # Firebase init
│       ├── auth-context.tsx          # auth state + admin check
│       ├── theme-context.tsx         # dark mode state
│       ├── jobs.ts                   # Firestore CRUD for jobs
│       ├── companies.ts              # derive companies from jobs
│       └── types.ts                  # shared TypeScript types
├── scripts/seed-jobs.ts              # optional demo data seeder
├── firestore.rules                   # Firestore security rules
├── tailwind.config.ts
├── next.config.js
└── .env.local.example
```

## 1. Prerequisites

- Node.js 18.18+ (or 20+)
- A free [Firebase](https://console.firebase.google.com/) project
- A [Vercel](https://vercel.com/) account (for deployment)

## 2. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. Authentication → Users → **Add user** — create the one admin account (email + password) that will manage the job board.
4. **Firestore Database** → Create database → start in **production mode**.
5. Firestore → Rules → paste the contents of `firestore.rules` in this repo, replacing `REPLACE_WITH_YOUR_ADMIN_EMAIL` with your admin's email address. Publish.
6. Project settings (gear icon) → General → "Your apps" → click the **Web** icon (`</>`) → register an app → copy the `firebaseConfig` values.

## 3. Local Setup

```bash
git clone <this-repo-url>
cd myanmar-job-board
npm install
cp .env.local.example .env.local
```

Fill in `.env.local` with the values from step 2.6, and set `NEXT_PUBLIC_ADMIN_EMAIL` to the admin email you created in step 2.3:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`. Go to `/login` and sign in with the admin account to access `/admin`.

### (Optional) Seed sample jobs

To quickly populate Firestore with a few demo listings:

```bash
npm run seed
```

> This uses the client SDK, so it must run while your Firestore rules allow writes (e.g. temporarily allow `create` for any authenticated user, or run it after signing in via the Firebase emulator). For production, just add jobs through `/admin` instead.

## 4. Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, click **New Project** → import the repo.
3. Add the same environment variables from `.env.local` in the Vercel project's **Settings → Environment Variables**.
4. Deploy. Vercel will auto-detect Next.js and build/deploy automatically.
5. In Firebase Authentication → Settings → **Authorized domains**, add your Vercel domain (e.g. `your-app.vercel.app`) so login works in production.

## 5. How the Admin System Works

- Anyone can create a Firebase Auth account in theory, but only the user whose email matches `NEXT_PUBLIC_ADMIN_EMAIL` is treated as an admin in the UI (`src/lib/auth-context.tsx`), **and** Firestore security rules (`firestore.rules`) independently enforce that only that email can write to the `jobs` collection — so this is safe even if someone bypasses the UI.
- To change the admin, update `NEXT_PUBLIC_ADMIN_EMAIL` and the email check in `firestore.rules`, then create/reuse a Firebase Auth user with that email.

## 6. Customization Ideas

- Add pagination or infinite scroll to `/jobs` once you have many listings.
- Add a dedicated `companies` Firestore collection if you want editable company profiles instead of auto-derived ones.
- Hook the contact form up to a real backend (e.g. Firebase Functions + email service) instead of `mailto:`.
- Add image upload for company logos via Firebase Storage.

## License

MIT — free to use and modify for your own job board.
