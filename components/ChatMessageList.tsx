/**
 * File: /components/ChatMessageList.tsx
 * 
 * Description:
 * - Displays chat messages in a full-width scrollable container, with all text left-aligned and no bubbles, styled simply like Telegram.
 */

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";

interface ChatMessageListProps {
  messages: ChatMessage[];
  publicKey?: string;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, publicKey }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-card flex flex-col flex-1 overflow-y-auto p-4">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-teal-600">
                {msg.sender === publicKey ? "You" : msg.sender.substring(0, 6)}:
              </span>
              <span className="text-gray-800">{msg.message}</span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;