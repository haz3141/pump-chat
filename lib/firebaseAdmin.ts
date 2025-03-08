/**
 * File: /lib/firebaseAdmin.ts
 *
 * Description:
 * - Initializes Firebase Admin SDK for authentication & database access.
 * - Handles both local development (`.env.local`) and production (`Vercel`).
 */

import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth"; // ✅ Explicit Auth type
import { getDatabase } from "firebase-admin/database";

let adminAuth: Auth; // ✅ Explicitly declare type for adminAuth

if (!getApps().length) {
  try {
    console.log("🔹 Initializing Firebase Admin SDK...");

    // Load and decode Firebase Service Account Key
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error("❌ Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
    }

    const decodedKey = JSON.parse(Buffer.from(serviceAccountKey, "base64").toString("utf-8"));

    initializeApp({
      credential: cert(decodedKey), // ✅ Uses decoded credentials
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // ✅ Ensure DB URL is set
    });

    console.log("✅ Firebase Admin SDK initialized successfully.");

    adminAuth = getAuth(getApp()); // ✅ Assign auth instance after initialization

  } catch (error) {
    console.error("❌ Error initializing Firebase Admin SDK:", error);
  }
} else {
  adminAuth = getAuth(getApp()); // ✅ Ensure adminAuth is always available
}

// ✅ Export Firebase services
export { adminAuth };
export const adminDB = getDatabase(getApp());
