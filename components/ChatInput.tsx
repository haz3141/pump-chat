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
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white flex items-center gap-4 px-4 py-2 shadow-lg">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className={`flex-1 text-gray-800 px-4 py-2 border rounded-lg ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white focus:ring-2 focus:ring-teal-500"
        }`}
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        onClick={() => {
          if (!disabled && newMessage.trim() !== "") {
            sendMessage(newMessage);
            setNewMessage("");
          }
        }}
        disabled={disabled}
        className={`p-2 rounded-lg transition flex items-center justify-center ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
        }`}
      >
        <PaperAirplaneIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default ChatInput;