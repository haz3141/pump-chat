/**
 * File: /app/api/auth/route.ts
 * 
 * Description:
 * - API route for authenticating Solana wallets with Firebase.
 * - Verifies a signed message to prove wallet ownership.
 * - Generates a Firebase Custom Auth Token upon successful verification.
 */

import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin"; // ✅ Import Firebase Admin SDK
import nacl from "tweetnacl";
import bs58 from "bs58";

const AUTH_MESSAGE = "Sign this message to authenticate with Kulture.Fun."; // ✅ Must match the frontend

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 Incoming authentication request...");

    // Ensure request is in JSON format
    if (!req.headers.get("content-type")?.includes("application/json")) {
      console.error("❌ Invalid request: Content-Type must be application/json");
      return NextResponse.json({ error: "Invalid content type" }, { status:400 });
    }

    // Parse the request body
    const { walletAddress, signedMessage } = await req.json();
    if (!walletAddress || !signedMessage) {
      console.error("❌ Missing required fields: walletAddress or signedMessage");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(`🔹 Authenticating wallet: ${walletAddress}`);

    // ✅ Ensure the signed message is properly decoded
    let signedMessageBytes;
    try {
      signedMessageBytes = new Uint8Array(bs58.decode(signedMessage)); // ✅ Correctly decode the signed message
    } catch (err) {
      console.error("❌ Invalid signed message format:", err);
      return NextResponse.json({ error: "Invalid signed message format" }, { status: 400 });
    }

    // Expected message format for authentication
    const expectedMessageBytes = new TextEncoder().encode(AUTH_MESSAGE); // ✅ Ensure same encoding as frontend

    // Decode the wallet public key
    let walletPublicKey;
    try {
      walletPublicKey = bs58.decode(walletAddress);
    } catch (err) {
      console.error("❌ Invalid wallet address format:", err);
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }

    // Verify the signed message
    const isValid = nacl.sign.detached.verify(expectedMessageBytes, signedMessageBytes, walletPublicKey);

    if (!isValid) {
      console.warn(`⚠ Invalid signature for wallet: ${walletAddress}`);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // ✅ Ensure Firebase Admin SDK is initialized before using auth()
    if (!adminAuth) {
      throw new Error("Firebase Admin SDK is not initialized.");
    }

    // Generate a Firebase Custom Auth Token
    console.log("🔹 Generating Firebase auth token...");
    const token = await adminAuth.createCustomToken(walletAddress);

    console.log(`✅ Authentication successful for wallet: ${walletAddress}`);
    return NextResponse.json({ token });

  } catch (error) {
    console.error("❌ Authentication error:", error);

    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
