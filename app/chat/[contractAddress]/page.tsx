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
//import GeckoTerminalChart from "@/components/GeckoTerminalChart";

export default function ChatPage() {
  const { contractAddress } = useParams<{ contractAddress: string }>();
  const [newMessage, setNewMessage] = useState("");
  const { publicKey } = useWallet();

  // Ensure contractAddress is a string
  const contractAddressString = contractAddress ?? "";

  // Use the custom hook to manage chat messages
  const messages = useChat(contractAddressString);

  // Use the custom hook to fetch DeFi data
  const network = "solana"; // Change this based on your network
  const { data, loading, error } = useDeFiData(network, contractAddressString);

  // Function to send a new message using the utility function
  const handleSendMessage = () => {
    if (contractAddressString && publicKey) {
      sendMessage(contractAddressString, publicKey, newMessage).then(() => {
        setNewMessage(""); // Clear the input field after sending
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      {/* Page Title */}
      <ChatHeader />

      {/* Display the current contract address */}
      <ChatContractInfo contractAddress={contractAddressString} />

      {/* Display DeFi data */}
      <DeFiDataDisplay data={data} loading={loading} error={error} />

      {/* Chat messages container */}
      <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />

      {/* Chat input area */}
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={handleSendMessage}
        disabled={!newMessage.trim()}
      />

      {/* Display GeckoTerminal Chart */}
      {/* <GeckoTerminalChart contractAddress={contractAddressString} /> */}
    </main>
  );
}
