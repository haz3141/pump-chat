/**
 * File: /components/ChatMessageList.tsx
 *
 * Description:
 * - Renders a list of chat messages.
 * - Auto-scrolls to the latest message.
 * - Formats messages based on sender identity.
 */

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";

interface ChatMessageListProps {
  messages: ChatMessage[];
  publicKey?: string;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, publicKey }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="h-80 overflow-y-auto border-b border-gray-300 pb-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-semibold text-blue-600">
                {msg.sender === publicKey ? "You" : msg.sender.substring(0, 6)}:
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
  );
};

export default ChatMessageList;
