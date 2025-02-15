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
  // State to track if contract address has been copied
  const [copied, setCopied] = useState(false);

  // If no contract address is provided, do not render the component
  if (!contractAddress) return null;

  // Construct external links
  const dexScreenerUrl = `https://dexscreener.com/solana/${contractAddress}`;
  const solscanUrl = `https://solscan.io/address/${contractAddress}`;

  /**
   * Copies contract address to clipboard and shows a temporary "Copied" icon.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4 flex flex-col gap-3">
      {/* Token Info Section */}
      <div>
        <p className="text-lg font-semibold text-black">
          {name || "Unknown"} ({symbol || "N/A"})
        </p>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          {/* Solscan Link */}
          <a
            href={solscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            CA:
          </a>
          <span className="break-all">{contractAddress}</span>
          
          {/* Copy to Clipboard Button */}
          <button onClick={handleCopy} className="ml-1 text-gray-500 hover:text-black transition">
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-600" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* External Links + AI Button Layout */}
      <div className="flex items-center justify-between">
        {/* External Links (To be updated with actual URLs) */}
        <div className="flex gap-3 text-xs">
          <a href={dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            DexScreener
          </a>
          <a href="#" className="text-blue-600 hover:underline">X</a>
          <a href="#" className="text-blue-600 hover:underline">Telegram</a>
          <a href="#" className="text-blue-600 hover:underline">Website</a>
        </div>

        {/* Placeholder AI Button */}
        <Button variant="primary" size="sm" className="ml-auto" disabled>
          🤖 Ask AI (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default ChatContractInfo;
