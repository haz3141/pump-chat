/**
 * File: /components/ChatContractInfo.tsx
 * Description:
 * - Displays essential contract details for a given token.
 * - Shows token name & symbol (if available).
 * - Provides a clickable contract address with copy functionality.
 * - Includes external links (DexScreener, Solscan, etc.).
 * - Displays a placeholder AI button for future functionality.
 */

import React, { useState } from "react";
import Button from "@/components/Button";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ChatContractInfoProps {
  contractAddress?: string;
  name?: string;
  symbol?: string;
}

const ChatContractInfo: React.FC<ChatContractInfoProps> = ({ contractAddress, name, symbol }) => {
  const [copied, setCopied] = useState(false);

  if (!contractAddress) return null;

  const dexScreenerUrl = `https://dexscreener.com/solana/${contractAddress}`;
  const solscanUrl = `https://solscan.io/address/${contractAddress}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="chat-card mb-6 flex flex-col gap-4">
      {/* Token Info */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          {name || "Unknown"} ({symbol || "N/A"})
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href={solscanUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-semibold">
            CA:
          </a>
          <span className="break-all">{contractAddress}</span>
          <button onClick={handleCopy} className="ml-1 text-gray-500 hover:text-gray-700">
            {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <ClipboardIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Links and Button */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <a href={dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
            DexScreener
          </a>
          <a href="#" className="text-teal-600 hover:text-teal-700">X</a>
          <a href="#" className="text-teal-600 hover:text-teal-700">Telegram</a>
          <a href="#" className="text-teal-600 hover:text-teal-700">Website</a>
        </div>
        <Button className="chat-button" disabled>
          🤖 Ask AI (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default ChatContractInfo;