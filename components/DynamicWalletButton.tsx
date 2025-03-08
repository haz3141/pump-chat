/**
 * File: /components/DynamicWalletButton.tsx
 * 
 * Description:
 * - Handles wallet connection and authentication.
 * - Signs a message only if the user is not already authenticated.
 * - Uses session storage to persist authentication state across pages.
 */

"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { auth, authenticateWithWallet } from "@/lib/firebaseConfig";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const AUTH_MESSAGE = "Sign this message to authenticate with Kulture.Fun.";

const DynamicWalletButton: React.FC = () => {
  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const authenticate = async () => {
      if (!publicKey || !signMessage) return;

      console.log("🔹 Checking Firebase authentication...");
      
      // Check if user is already authenticated with Firebase
      if (auth.currentUser) {
        console.log("✅ User already authenticated with Firebase.");
        return;
      }

      // Check session storage to avoid signing again
      const cachedWallet = sessionStorage.getItem("authenticatedWallet");
      if (cachedWallet === publicKey.toBase58()) {
        console.log("✅ Authentication found in session storage. Skipping signature.");
        return;
      }

      console.log("🔹 Wallet connected, requesting signature...");
      try {
        const encodedMessage = new TextEncoder().encode(AUTH_MESSAGE);
        const signedMessage = await signMessage(encodedMessage);

        console.log("✅ Message signed!");

        await authenticateWithWallet(publicKey.toBase58(), signedMessage);
        sessionStorage.setItem("authenticatedWallet", publicKey.toBase58());

        console.log("✅ Wallet authentication successful!");
      } catch (error) {
        console.error("❌ Wallet authentication failed:", error);
      }
    };

    authenticate();
  }, [publicKey, signMessage]);

  return <WalletMultiButton />;
};

export default DynamicWalletButton;