/**
 * File: /components/ChatInput.tsx
 *
 * Description:
 * - Renders the chat input area.
 * - Handles sending new messages.
 */

import React from "react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  disabled,
}) => {
  return (
    <div className="w-full max-w-lg flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none text-black"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        autoFocus
      />
      <button
        onClick={sendMessage}
        disabled={disabled}
        className={`px-4 py-2 rounded-r-lg transition ${
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
