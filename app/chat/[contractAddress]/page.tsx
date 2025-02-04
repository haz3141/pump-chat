/**
 * File: /app/chat/[contractAddress]/page.tsx
 * Description:
 * - Chat room page for a specific token-based chat.
 * - Displays chat messages and allows users to send new messages.
 * - Auto-scrolls to the latest message.
 */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { realtimeDB } from "@/lib/firebaseConfig";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChatMessage } from "@/types/chat";

export default function ChatPage() {
  const { contractAddress } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { publicKey } = useWallet();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Listen for changes to the chat messages in the realtime database
  useEffect(() => {
    if (!contractAddress) return;

    const chatRef = ref(realtimeDB, `chats/${contractAddress}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allMessages: ChatMessage[] = Object.keys(data).map((key) => ({
          id: key,
          sender: data[key].sender,
          message: data[key].message,
          timestamp: data[key].timestamp,
        }));
        // Sort messages by timestamp (oldest first)
        allMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [contractAddress]);

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) {
      alert("Cannot send an empty message!");
      return;
    }
    if (!publicKey) {
      alert("Please connect your wallet to send messages.");
      return;
    }

    const chatRef = ref(realtimeDB, `chats/${contractAddress}/messages`);
    const messageData = {
      sender: publicKey.toBase58(),
      message: newMessage,
      timestamp: Date.now(),
    };

    console.log("Sending message:", messageData);

    push(chatRef, messageData)
      .then(() => {
        console.log("Message sent successfully!");
        setNewMessage(""); // Clear the input field after sending
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat Room</h1>

      {/* Display the current contract address */}
      <p className="text-gray-600 mb-6">Contract: {contractAddress}</p>

      {/* Chat messages container */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="h-80 overflow-y-auto border-b border-gray-300 pb-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <span className="font-semibold text-blue-600">
                  {msg.sender === publicKey?.toBase58() ? "You" : msg.sender.substring(0, 6)}:
                </span>{" "}
                <span className="text-gray-800">{msg.message}</span>
                <span className="block text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          )}
          {/* Reference element to auto-scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input area */}
      <div className="w-full max-w-lg flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          autoFocus
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className={`px-4 py-2 rounded-r-lg transition ${
            newMessage.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
      
    </main>
  );
}
