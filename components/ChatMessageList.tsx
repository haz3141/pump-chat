/**
 * File: /components/ChatMessageList.tsx
 * Description:
 * - Displays a list of chat messages.
 * - Shows the sender, message content, and timestamp.
 * - Auto-scrolls to the latest message when new messages are added.
 */

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";

interface ChatMessageListProps {
  messages: ChatMessage[];
  publicKey?: string;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, publicKey }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col">
      <div className="flex-1 pb-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="font-semibold text-blue-600">
                  {msg.sender === publicKey ? "You" : msg.sender.substring(0, 6)}:
                </span>{" "}
                <span className="text-gray-800">{msg.message}</span>
              </div>
              <span className="block text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
