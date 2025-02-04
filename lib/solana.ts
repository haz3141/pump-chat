/**
 * File: /lib/solana.ts
 * Description: Provides helper functions to interact with the Helius API and fetch
 * Solana fungible token assets.
 */

import axios from "axios";
import { FungibleTokenAsset } from "@/types/solana";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

interface RawToken {
  id: string;
  interface: string;
  content: {
    metadata: {
      name: string;
      symbol: string;
      description: string;
    };
  };
  token_info: {
    balance: number;
    supply: number;
    decimals: number;
    associated_token_address: string;
  };
}

interface HeliusApiResponse {
  result: {
    items: RawToken[];
  };
}

/**
 * Fetch Solana fungible tokens owned by a wallet.
 *
 * @param walletAddress - The Solana wallet public key as a string.
 * @returns An array of fungible token assets.
 */
export async function fetchTokensFromHelius(
  walletAddress: string,
): Promise<FungibleTokenAsset[]> {
  if (!HELIUS_API_KEY) {
    throw new Error("Helius API key is missing. Check your environment configuration.");
  }

  try {
    const response = await axios.post<HeliusApiResponse>(HELIUS_RPC_URL, {
      jsonrpc: "2.0",
      id: "",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: walletAddress,
        page: 1,
        displayOptions: {
          showFungible: true,
        },
      },
    });

    const assets = response.data.result?.items || [];
    const fungibleTokens = assets.filter((item: RawToken) => item.interface === "FungibleToken");
    return fungibleTokens.map((token: RawToken): FungibleTokenAsset => ({
      id: token.id,
      content: {
        metadata: {
          name: token.content.metadata.name,
          symbol: token.content.metadata.symbol,
          description: token.content.metadata.description,
        },
      },
      token_info: {
        balance: token.token_info.balance,
        supply: token.token_info.supply,
        decimals: token.token_info.decimals,
        associated_token_address: token.token_info.associated_token_address,
      },
    }));
  } catch (error) {
    console.error("Error fetching tokens from Helius:", error);
    throw new Error("Failed to fetch token data from Helius API");
  }
}
