/**
 * File: /app/chat/page.tsx
 * Description:
 * - Main chat page for Pump.Chat.
 * - Allows users to connect their wallet and view their fungible tokens.
 * - Provides access to token-specific chat rooms.
 */

"use client";

import DynamicWalletButton from "@/components/DynamicWalletButton";
import { useUserTokens } from "@/hooks/useUserTokens";
import ChatHeader from "@/components/ChatHeader";
import TokenList from "@/components/TokenList";
import WalletPrompt from "@/components/WalletPrompt";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import NoTokensMessage from "@/components/NoTokensMessage";

export default function ChatPage() {
  const { tokens, loading, error, isConnected } = useUserTokens();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      {/* Page Title */}
      <ChatHeader />

      {/* Wallet Connection Button */}
      <DynamicWalletButton />

      {/* Prompt user to connect wallet if not connected */}
      {!isConnected && <WalletPrompt />}

      {/* Display loading state */}
      {loading && <LoadingMessage />}

      {/* Display error message if token fetch fails */}
      {error && <ErrorMessage message={error} />}

      {/* Display token list and join chat buttons if tokens are available */}
      {isConnected && !loading && !error && tokens.length > 0 && (
        <TokenList tokens={tokens} />
      )}

      {/* Message when no tokens are found in the connected wallet */}
      {isConnected && !loading && !error && tokens.length === 0 && (
        <NoTokensMessage />
      )}
    </main>
  );
}
