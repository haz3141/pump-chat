/**
 * File: /components/TopChats.tsx
 *
 * Description:
 * - Displays a list of the most active chat rooms with member counts.
 * - Includes a join button for each chat room.
 * - Styled as a modern card for an app-like experience.
 */

import React from "react";

const mockTopChats = [
  { name: "SOL Whales", members: 1200 },
  { name: "Pepe Coin Army", members: 980 },
  { name: "Memecoin OGs", members: 860 },
];

const TopChats: React.FC = () => {
  return (
    <div className="chat-card flex-1 min-w-[250px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">🔥 Top Chats</h2>
      <ul className="space-y-4">
        {mockTopChats.map((chat, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{chat.name}</span>
              <span className="text-sm text-gray-500">({chat.members} members)</span>
            </div>
            <button className="chat-button text-sm px-3 py-1">
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopChats;