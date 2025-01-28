import axios from "axios";

import { FungibleTokenAsset } from "@/types/solana";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

/**
 * Fetch Solana fungible tokens owned by a wallet.
 * Filters out NFTs by checking the "interface" field.
 *
 * @param walletAddress - The Solana wallet public key as a string
 * @returns An array of fungible token assets
 */
export async function fetchTokensFromHelius(
  walletAddress: string,
): Promise<FungibleTokenAsset[]> {
  if (!HELIUS_API_KEY) {
    throw new Error("Helius API key is missing. Check your .env.local file.");
  }

  try {
    const response = await axios.post(HELIUS_RPC_URL, {
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

    // Filter only fungible tokens by checking "interface" property
    const fungibleTokens = assets.filter(
      (item: any) => item.interface === "FungibleToken",
    );

    return fungibleTokens.map((token: any) => ({
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
