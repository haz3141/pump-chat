/**
 * File: /components/TopChats.tsx
 *
 * Description:
 * - Displays a list of the most active chat rooms with a join button.
 */

import React from "react";

const mockTopChats = [
  { name: "SOL Whales", members: 1200 },
  { name: "Pepe Coin Army", members: 980 },
  { name: "Memecoin OGs", members: 860 },
];

const TopChats: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-md min-w-[250px]">
      <h2 className="text-lg font-semibold mb-2 text-black">🔥 Top Chats</h2>
      <ul className="text-black">
        {mockTopChats.map((chat, index) => (
          <li key={index} className="py-2 border-b last:border-none flex justify-between items-center">
            <div>
              <span className="font-medium">{chat.name}</span>{" "}
              <span className="text-gray-500">({chat.members} members)</span>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopChats;
