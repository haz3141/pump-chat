/**
 * File: /app/chat/[contractAddress]/page.tsx
 *
 * Description:
 * - Chat room for a specific token-based chat.
 * - Displays chat messages and allows users to send new messages.
 * - Maximizes horizontal space for an app-like experience.
 * - Displays DeFi data, GeckoTerminal chart, and staking mockup.
 */

"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import ChatMessageList from "@/components/ChatMessageList";
import ChatInput from "@/components/ChatInput";
import ChatContractInfo from "@/components/ChatContractInfo";
import ChatHeader from "@/components/ChatHeader";
import useChat from "@/hooks/useChat";
import { sendMessage } from "@/lib/chatUtils";
import useDeFiData from "@/hooks/useDeFiData";
import DeFiDataDisplay from "@/components/DeFiDataDisplay";
import StakingMockup from "@/components/StakingMockup";

export default function ChatPage() {
  const { contractAddress } = useParams<{ contractAddress: string }>();
  const contractAddressString = contractAddress ?? "";

  const [newMessage, setNewMessage] = useState(""); // ✅ Make sure state updates properly
  const messages = useChat(contractAddressString);
  const { publicKey } = useWallet();

  const network = "solana";
  const { data, loading, error } = useDeFiData(network, contractAddressString);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!contractAddressString || !publicKey) {
      alert("You must connect your wallet to send messages.");
      return;
    }

    try {
      await sendMessage(contractAddressString, publicKey, newMessage);
      setNewMessage(""); // ✅ Clear input after sending
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };

  const isDisabled = !publicKey;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Page Header (Sticky) */}
      <ChatHeader />

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[98vw] mx-auto gap-4 overflow-hidden pt-[80px]">
        {/* Left Section: Chat Panel */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden w-full px-2 md:px-4">
          <ChatContractInfo
            contractAddress={contractAddressString}
            name={data?.data?.attributes?.name}
            symbol={data?.data?.attributes?.symbol}
          />
          <div className="flex-1 overflow-y-auto px-2 py-3">
            <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
          </div>
          <div className="w-full sticky bottom-0 bg-white px-3 py-2">
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage} // ✅ Ensure this updates state
              sendMessage={handleSendMessage}
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Right Section: DeFi Data & Staking */}
        <div className="hidden md:flex w-[30%] max-w-[380px] bg-white rounded-lg shadow-md flex-col overflow-hidden">
          <DeFiDataDisplay data={data} loading={loading} error={error} />
          <div className="w-full mt-4 px-3 pb-4">
            <StakingMockup tokenSymbol={data?.data?.attributes?.symbol || "TOKEN"} />
          </div>
        </div>
      </div>
    </div>
  );
}

