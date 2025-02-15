/**
 * File: /components/ChatInput.tsx
 * Description:
 * - Chat input component that allows users to type messages.
 * - Sends messages to the chat and handles keyboard input events.
 */

import React from "react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  disabled,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(newMessage);
    }
  };

  return (
    <div className="w-full flex items-center border-t border-gray-300 pt-4">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none text-black"
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button
        onClick={() => sendMessage(newMessage)}
        disabled={disabled}
        className={`px-5 py-3 rounded-r-lg transition ${
          !disabled
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
