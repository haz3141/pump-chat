/**
 * File: /components/ChatInput.tsx
 * Description:
 * - Full-width message input box with sticky positioning, improved spacing, and no top border.
 */

import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  disabled = false,
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled && newMessage.trim() !== "") {
      sendMessage(newMessage);
      setNewMessage(""); // ✅ Clear input after sending
    }
  };

  return (
    <div className="sticky bottom-0 p-4 bg-white flex items-center gap-2 shadow-lg border-t border-gray-200">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} // ✅ Ensure state updates
        className={`chat-input flex-1 text-gray-800 px-3 py-2 border rounded-lg ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        onClick={() => {
          if (!disabled && newMessage.trim() !== "") {
            sendMessage(newMessage);
            setNewMessage(""); // ✅ Clear input after sending
          }
        }}
        disabled={disabled}
        className={`chat-button p-3 transition flex items-center justify-center ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <PaperAirplaneIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
