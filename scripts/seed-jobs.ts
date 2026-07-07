/**
 * Optional helper: seed Firestore with sample Myanmar job listings.
 *
 * Usage:
 *   1. Fill in .env.local with your Firebase config (see .env.local.example).
 *   2. Run:  npx tsx scripts/seed-jobs.ts
 *      (or:  node -r dotenv/config -r ts-node/register scripts/seed-jobs.ts)
 *
 * This uses the same client SDK as the app, so it respects your Firestore
 * security rules — you must be signed in as the admin user for this to
 * succeed once rules are locked down. Easiest path: temporarily relax the
 * `create` rule in firestore.rules while seeding, then restore it.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "Golden Rock Tech",
    location: "Yangon",
    category: "IT & Software",
    type: "Full-time",
    salaryMin: 800000,
    salaryMax: 1400000,
    description:
      "We're looking for a Frontend Developer to build responsive web apps for clients across Southeast Asia. You'll work closely with our design and backend teams in a fast-paced, collaborative environment.",
    requirements: [
      "2+ years experience with React or Vue",
      "Strong understanding of HTML, CSS, and JavaScript",
      "Familiarity with REST APIs",
      "Good English communication skills"
    ],
    benefits: ["Health insurance", "Annual bonus", "Flexible working hours"],
    applyEmail: "careers@goldenrocktech.example",
    featured: true,
    createdAt: Date.now()
  },
  {
    title: "Sales Executive",
    company: "Irrawaddy Trading Co.",
    location: "Mandalay",
    category: "Sales & Marketing",
    type: "Full-time",
    salaryMin: 500000,
    salaryMax: 750000,
    description:
      "Join our growing sales team to develop new business relationships across Upper Myanmar. Ideal for a motivated self-starter with strong negotiation skills.",
    requirements: [
      "1+ years in B2B sales",
      "Own transportation preferred",
      "Fluent in Burmese and conversational English"
    ],
    benefits: ["Commission on sales", "Transportation allowance"],
    applyEmail: "hr@irrawaddytrading.example",
    featured: false,
    createdAt: Date.now()
  },
  {
    title: "Accountant",
    company: "Shwe Finance Group",
    location: "Yangon",
    category: "Finance & Accounting",
    type: "Full-time",
    salaryMin: 600000,
    salaryMax: 900000,
    description:
      "Manage day-to-day bookkeeping, reconciliations, and monthly reporting for a growing portfolio of SME clients.",
    requirements: [
      "LCCI Level 3 or equivalent",
      "Experience with QuickBooks or similar",
      "Detail-oriented and deadline-driven"
    ],
    benefits: ["Provident fund", "Training budget"],
    applyEmail: "jobs@shwefinance.example",
    featured: true,
    createdAt: Date.now()
  }
];

async function seed() {
  for (const job of sampleJobs) {
    const ref = await addDoc(collection(db, "jobs"), job);
    console.log(`Created job: ${job.title} (${ref.id})`);
  }
  console.log("Seeding complete.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
