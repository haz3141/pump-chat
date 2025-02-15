/**
 * File: /components/TrendingTokens.tsx
 *
 * Description:
 * - Displays a list of trending Solana memecoins with price changes.
 * - Allows users to join chat rooms for each trending token.
 */

import React from "react";

const mockTrendingTokens = [
  { name: "DOGE SOL", price: 0.0032, change: 12.5 },
  { name: "MOONPAW", price: 0.0156, change: -8.3 },
  { name: "RUGGED", price: 0.0009, change: 5.7 },
];

const TrendingTokens: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-md min-w-[250px]">
      <h2 className="text-lg font-semibold mb-2 text-black">🚀 Trending Tokens</h2>
      <ul className="text-black">
        {mockTrendingTokens.map((token, index) => (
          <li key={index} className="py-2 border-b last:border-none flex justify-between items-center">
            <div>
              <span className="font-medium">{token.name}</span>{" "}
              <span className="text-gray-500">(${token.price.toFixed(4)})</span>
              <span className={token.change >= 0 ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                {token.change >= 0 ? `+${token.change}%` : `${token.change}%`}
              </span>
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

export default TrendingTokens;
