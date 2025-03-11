"use client";

import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import ChatMessageList from "@/components/ChatMessageList";
import ChatInput from "@/components/ChatInput";
import ChatContractInfo from "@/components/ChatContractInfo";
import ChatHeader from "@/components/ChatHeader";
import ChatroomFooter from "@/components/ChatroomFooter";
import useChat from "@/hooks/useChat";
import { sendMessage } from "@/lib/chatUtils";
import useDeFiData from "@/hooks/useDeFiData";
import DeFiDataDisplay from "@/components/DeFiDataDisplay";
import StakingMockup from "@/components/StakingMockup";

// Type definitions for type safety
interface Token {
  id: string;
  token_info: {
    balance: number;
    decimals: number;
  };
}

/**
 * ChatPage Component
 * - **Ensures full viewport fit** without overflow.
 * - **No components hidden behind the header**.
 * - **Only chat messages scroll**, everything else is **static**.
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

  // Calculate available balance
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
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <ChatHeader />
      </div>

      {/* Main Layout - **Now fully adjusted for the viewport** */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[98vw] mx-auto gap-6 px-6 pt-[72px] pb-[48px] overflow-hidden">
        {/* Chat Panel - **Perfectly scaled height** */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden w-full h-[calc(100vh-120px)]">
          <ChatContractInfo
            contractAddress={contractAddressString}
            name={data?.data?.attributes?.name}
            symbol={data?.data?.attributes?.symbol}
          />
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
          </div>
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={handleSendMessage}
            disabled={isDisabled}
          />
        </div>

        {/* DeFi Data & Staking - **Now perfectly aligned** */}
        <div className="hidden md:flex w-full md:w-1/3 flex-col gap-3 h-[calc(100vh-120px)]">
          {/* DeFi Data - **Expands correctly** */}
          <div className="flex-1">
            <DeFiDataDisplay data={data} loading={defiLoading} error={defiError} />
          </div>

          {/* Staking - **Now fills vertical space correctly** */}
          <div className="flex-1">
            {balanceLoading ? (
              <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-900 flex-1">
                Loading balance...
              </div>
            ) : balanceError ? (
              <div className="bg-white rounded-lg shadow-md p-4 text-center text-red-600 font-medium flex-1">
                Error loading balance: {balanceError}
              </div>
            ) : (
              <StakingMockup
                tokenSymbol={data?.data?.attributes?.symbol || "TOKEN"}
                availableBalance={availableBalance}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <ChatroomFooter />
      </div>
    </div>
  );
}
