/**
 * File: /lib/firebaseConfig.ts
 * 
 * Description:
 * - Initializes Firebase and handles authentication via Solana wallet.
 * - Uses message signing to verify wallet ownership.
 */

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import bs58 from "bs58"; // ✅ Import base58 encoding

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDB = getDatabase(app);
export const auth = getAuth(app);

/**
 * Authenticates the user by signing a message and exchanging it for a Firebase token.
 */
export const authenticateWithWallet = async (walletAddress: string, signedMessage: Uint8Array) => {
  try {
    console.log("🔹 Requesting authentication from API...");

    // ✅ Convert signedMessage (Uint8Array) to base58 before sending
    const encodedSignedMessage = bs58.encode(signedMessage);

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress,
        signedMessage: encodedSignedMessage, // ✅ Send as base58 string
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`❌ Authentication failed! ${errorResponse.error || "Unknown error"}`);
    }

    const { token } = await response.json();
    if (!token) throw new Error("❌ Authentication failed! No token received.");

    await signInWithCustomToken(auth, token);
    console.log("✅ Wallet authenticated with Firebase!");
  } catch (error) {
    console.error("❌ Wallet authentication failed:", error);
  }
};
