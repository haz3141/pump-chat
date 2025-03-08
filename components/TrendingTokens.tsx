/**
 * File: /components/TrendingTokens.tsx
 *
 * Description:
 * - Displays a list of trending Solana memecoins with price changes.
 * - Allows users to join chat rooms for each trending token via a button.
 * - Styled as a modern card with consistent app-like design.
 */

import React from "react";

const mockTrendingTokens = [
  { name: "DOGE SOL", price: 0.0032, change: 12.5 },
  { name: "MOONPAW", price: 0.0156, change: -8.3 },
  { name: "RUGGED", price: 0.0009, change: 5.7 },
];

const TrendingTokens: React.FC = () => {
  return (
    <div className="chat-card flex-1 min-w-[250px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Trending Tokens</h2>
      <ul className="space-y-4">
        {mockTrendingTokens.map((token, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{token.name}</span>
              <span className="text-sm text-gray-500">(${token.price.toFixed(4)})</span>
              <span
                className={`text-sm ${
                  token.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {token.change >= 0 ? `+${token.change}%` : `${token.change}%`}
              </span>
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

export default TrendingTokens;