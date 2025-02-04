/**
 * File: /hooks/useUserTokens.ts
 * Description: Custom hook to fetch fungible tokens owned by the connected Solana wallet
 * using the Helius API. Manages loading, error, and connection states.
 */

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { fetchTokensFromHelius } from "@/lib/solana";
import { FungibleTokenAsset } from "@/types/solana";

export function useUserTokens() {
  const { publicKey } = useWallet();
  const [tokens, setTokens] = useState<FungibleTokenAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setTokens([]);
      setError(null);
      setIsConnected(false);
      return;
    }

    setIsConnected(true);
    const walletAddress = publicKey.toBase58();
    console.log("Wallet address:", walletAddress);

    async function loadTokens() {
      setLoading(true);
      setError(null);
      try {
        const fetchedTokens = await fetchTokensFromHelius(walletAddress);
        setTokens(fetchedTokens);
      } catch (err) {
        console.error("Error loading tokens:", err);
        setError("Failed to load tokens.");
      } finally {
        setLoading(false);
      }
    }

    loadTokens();
  }, [publicKey?.toBase58()]);

  return { tokens, loading, error, isConnected };
}
