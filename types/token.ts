/**
 * File: /types/token.ts
 * Description:
 * - Type declarations for the Token type.
 */

export interface Token {
    id: string;
    content: {
      metadata: {
        name: string;
        symbol: string;
      };
    };
    token_info: {
      balance: number;
      decimals: number;
    };
  }
  