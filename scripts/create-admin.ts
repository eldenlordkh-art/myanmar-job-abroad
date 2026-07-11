/**
 * One-off helper: creates the Firebase Auth admin user.
 * Usage: npx tsx scripts/create-admin.ts
 */

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.argv[2];

if (!ADMIN_PASSWORD) {
  console.error("Usage: npx tsx scripts/create-admin.ts <password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
  .then((cred) => {
    console.log(`Created admin user: ${cred.user.email} (${cred.user.uid})`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to create admin user:", err.code, err.message);
    process.exit(1);
  });
