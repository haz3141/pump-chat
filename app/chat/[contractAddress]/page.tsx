/**
 * File: /app/chat/[contractAddress]/page.tsx
 * @description A responsive chat interface for a specific token, ensuring DeFiDataDisplay
 *              and StakingMockup fill the vertical space without large gaps on all screen sizes.
 * @author [Your Name]
 * @version 1.2
 */

"use client";

import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import ChatMessageList from "@/components/ChatMessageList";
import ChatInput from "@/components/ChatInput";
import ChatContractInfo from "@/components/ChatContractInfo";
import ChatHeader from "@/components/ChatHeader";
import useChat from "@/hooks/useChat";
import { sendMessage } from "@/lib/chatUtils";
import useDeFiData from "@/hooks/useDeFiData";
import DeFiDataDisplay from "@/components/DeFiDataDisplay";
import StakingMockup from "@/components/StakingMockup";

// Type definitions for better type safety
interface Token {
  id: string;
  token_info: {
    balance: number;
    decimals: number;
  };
}

/**
 * ChatPage Component
 * @returns {JSX.Element} Rendered chat and DeFi interface
 */
export default function ChatPage() {
  const { contractAddress } = useParams<{ contractAddress: string }>();
  const contractAddressString = contractAddress ?? "";

  const [newMessage, setNewMessage] = useState("");
  const messages = useChat(contractAddressString);
  const { publicKey } = useWallet();

  const network = "solana";
  const { data, loading: defiLoading, error: defiError } = useDeFiData(network, contractAddressString);
  const { tokens, loading: balanceLoading, error: balanceError } = useUserTokens();

  // Memoized calculation to prevent re-computation on every render
  const getAvailableBalance = useCallback(() => {
    const token = tokens.find((t: Token) => t.id === contractAddressString);
    return token ? token.token_info.balance / 10 ** token.token_info.decimals : 0;
  }, [tokens, contractAddressString]);

  const availableBalance = getAvailableBalance();

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;
    if (!contractAddressString || !publicKey) {
      alert("You must connect your wallet to send messages.");
      return;
    }
    try {
      await sendMessage(contractAddressString, publicKey, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  }, [newMessage, contractAddressString, publicKey]);

  const isDisabled = !publicKey;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 overflow-hidden">
      {/* Sticky Header */}
      <ChatHeader />

      {/* Main Content - Constrained to prevent overflow */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[98vw] mx-auto gap-6 pt-24 px-6 overflow-hidden">
        {/* Chat Panel - Left Side */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden w-full">
          <ChatContractInfo
            contractAddress={contractAddressString}
            name={data?.data?.attributes?.name}
            symbol={data?.data?.attributes?.symbol}
          />
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
          </div>
          <div className="w-full sticky bottom-0 bg-white">
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={handleSendMessage}
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Right Column - DeFi Data & Staking with proper vertical space utilization */}
        <div className="hidden md:flex w-full md:w-1/3 flex-col gap-3 h-[calc(100vh-96px)] overflow-hidden">
          {/* DeFi Data - Takes available space and grows to fill gap */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <DeFiDataDisplay data={data} loading={defiLoading} error={defiError} />
          </div>

          {/* Staking - Maintains minimum height and follows DeFiDataDisplay */}
          {balanceLoading ? (
            <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-900 flex-shrink-0" aria-live="polite">
              Loading balance...
            </div>
          ) : balanceError ? (
            <div className="bg-white rounded-lg shadow-md p-4 text-center text-red-600 font-medium flex-shrink-0" aria-live="polite">
              Error loading balance: {balanceError}
            </div>
          ) : (
            <div className="flex-shrink-0 flex flex-col min-h-0 overflow-hidden">
              <StakingMockup
                tokenSymbol={data?.data?.attributes?.symbol || "TOKEN"}
                availableBalance={availableBalance}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}