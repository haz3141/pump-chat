// Define the structure of the token metadata
interface TokenMetadata {
    description: string;
    name: string;
    symbol: string;
  }
  
  // Define the structure of token info
  interface TokenInfo {
    balance: number;
    supply: number;
    decimals: number;
    associated_token_address: string;
  }
  
  // Define the main structure of a fungible token asset
  export interface FungibleTokenAsset {
    id: string;  // Mint address
    content: {
      metadata: TokenMetadata;
    };
    token_info: TokenInfo;
  }
  