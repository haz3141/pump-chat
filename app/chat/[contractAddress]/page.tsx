/**
 * File: /app/chat/[contractAddress]/page.tsx
 * Description:
 * - Chat room page for a specific token-based chat.
 * - Displays chat messages and allows users to send new messages.
 * - Auto-scrolls to the latest message.
 * - Displays DeFi data and GeckoTerminal chart for the contract address.
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
    <main className="h-screen flex flex-col bg-gray-100 p-6">
      {/* Page Header */}
      <ChatHeader />

      {/* Main Content Layout (80vw, centered) */}
      <div className="flex-1 w-[80vw] mx-auto flex flex-col md:flex-row gap-6 mt-4 overflow-hidden">
        
        {/* Left Section: Chat */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col">
          <ChatContractInfo 
            contractAddress={contractAddressString} 
            name={data?.data?.attributes?.name} 
            symbol={data?.data?.attributes?.symbol} 
          />
          {/* Chat Message List Container with fixed height for scrolling */}
          <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: "calc(100vh - 300px)" }}>
            <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
          </div>
          {/* Chat Input fixed at the bottom of the chat section */}
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={handleSendMessage}
            disabled={!newMessage.trim()}
          />
        </div>

        {/* Right Section: DeFi Data & Buy/Sell */}
        <div className="w-full md:w-[22%] bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <DeFiDataDisplay data={data} loading={loading} error={error} />
        </div>
      </div>

      {/* Footer */}
      <ChatFooter />
    </main>
  );
}
