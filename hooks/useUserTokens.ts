/**
 * File: /hooks/useUserTokens.ts
 * Description:
 * - Fetches fungible tokens owned by the connected Solana wallet.
 * - Ensures authentication is completed before fetching tokens.
 */

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig"; // Import Firebase Auth
import { fetchTokensFromHelius } from "@/lib/solana";
import { FungibleTokenAsset } from "@/types/solana";

export function useUserTokens() {
  const { publicKey } = useWallet();
  const [tokens, setTokens] = useState<FungibleTokenAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadTokens = async () => {
      if (!publicKey) {
        setTokens([]);
        setError(null);
        setIsAuthenticated(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // ✅ Ensure user is authenticated before fetching tokens
        await new Promise((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              setIsAuthenticated(true);
              resolve(user);
            }
          });
          return () => unsubscribe();
        });

        const walletAddress = publicKey.toBase58();
        console.log("🔹 Wallet authenticated, fetching tokens...");
        const fetchedTokens = await fetchTokensFromHelius(walletAddress);
        setTokens(fetchedTokens);
      } catch (err) {
        console.error("❌ Error loading tokens:", err);
        setError("Failed to load tokens.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadTokens();
  }, [publicKey]);

  return { tokens, loading, error, isAuthenticated };
}
