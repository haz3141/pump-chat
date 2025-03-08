/**
 * File: /components/WalletPrompt.tsx
 *
 * Description:
 * - Prompts the user to connect their wallet with a clear call-to-action.
 * - Styled as a modern card with a button for app-like interactivity.
 */

import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletPrompt: React.FC = () => {
  return (
    <div className="chat-card text-center">
      <p className="text-gray-600 mb-4">
        Please connect your wallet to view your tokens.
      </p>
      <WalletMultiButton className="chat-button inline-flex items-center justify-center" />
    </div>
  );
};

export default WalletPrompt;