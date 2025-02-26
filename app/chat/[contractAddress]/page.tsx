/**
 * File: /app/chat/[contractAddress]/page.tsx
 * 
 * Description:
 * - Chat room page for a specific token-based chat.
 * - Displays chat messages and allows users to send new messages.
 * - Auto-scrolls to the latest message.
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
import ChatFooter from "@/components/ChatFooter";
import StakingMockup from "@/components/StakingMockup"; // Import staking mockup

export default function ChatPage() {
  const { contractAddress } = useParams<{ contractAddress: string }>();
  const [newMessage, setNewMessage] = useState("");
  const { publicKey } = useWallet();

  const contractAddressString = contractAddress ?? "";
  const messages = useChat(contractAddressString);
  const network = "solana"; // Adjust as needed
  const { data, loading, error } = useDeFiData(network, contractAddressString);

  const handleSendMessage = () => {
    if (contractAddressString && publicKey) {
      sendMessage(contractAddressString, publicKey, newMessage).then(() => {
        setNewMessage("");
      });
    }
  };

  return (
    <main className="h-screen overflow-hidden flex flex-col bg-gray-100 p-6">
      {/* Page Header */}
      <ChatHeader />

      {/* Main Content Layout */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 overflow-hidden">

        {/* Left Section: Chat */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col overflow-hidden">
          <ChatContractInfo
            contractAddress={contractAddressString}
            name={data?.data?.attributes?.name}
            symbol={data?.data?.attributes?.symbol}
          />
          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-200 rounded-lg">
            <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
          </div>
          {/* Chat Input fixed at the bottom */}
          <div className="sticky bottom-0 bg-white p-2">
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={handleSendMessage}
              disabled={!newMessage.trim()}
            />
          </div>
        </div>

        {/* Right Section: DeFi Data & Staking */}
        <div className="w-full md:w-[25%] max-w-sm bg-white p-4 rounded-lg shadow-md flex flex-col overflow-y-auto">
          <DeFiDataDisplay data={data} loading={loading} error={error} />
          <div className="w-full mt-4">
            <StakingMockup tokenSymbol={data?.data?.attributes?.symbol || "TOKEN"} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <ChatFooter />
    </main>
  );
}
