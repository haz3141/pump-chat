"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { realtimeDB } from "@/lib/firebaseConfig";
import { useWallet } from "@solana/wallet-adapter-react";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
}

export default function ChatPage() {
  const { contractAddress } = useParams(); // Get contractAddress from URL
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { publicKey } = useWallet();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contractAddress) return;

    const chatRef = ref(realtimeDB, `chats/${contractAddress}/messages`);

    // Listen for changes in real-time
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allMessages: ChatMessage[] = Object.keys(data).map((key) => ({
          id: key,
          sender: data[key].sender,
          message: data[key].message,
          timestamp: data[key].timestamp,
        }));

        // Sort messages by timestamp
        allMessages.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [contractAddress]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!publicKey) {
      alert("Please connect your wallet to send messages.");
      return;
    }

    const chatRef = ref(realtimeDB, `chats/${contractAddress}/messages`);
    const newMsgRef = push(chatRef);

    push(chatRef, {
      sender: publicKey.toBase58(),
      message: newMessage,
      timestamp: Date.now(),
    })
      .then(() => {
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat Room</h1>
      <p className="text-gray-600 mb-6">Contract: {contractAddress}</p>

      {/* Messages Display */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="h-80 overflow-y-auto border-b border-gray-300 pb-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <span className="font-semibold text-blue-600">
                  {msg.sender === publicKey?.toBase58() ? "You" : msg.sender.substring(0, 6)}:
                </span>{" "}
                <span className="text-gray-800">{msg.message}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
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
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </main>
  );
}
