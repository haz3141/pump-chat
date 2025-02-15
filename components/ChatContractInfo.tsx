import React, { useState } from "react";
import Button from "@/components/Button";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ChatContractInfoProps {
  contractAddress: string | undefined;
  name?: string;
  symbol?: string;
}

const ChatContractInfo: React.FC<ChatContractInfoProps> = ({ contractAddress, name, symbol }) => {
  if (!contractAddress) return null;

  const [copied, setCopied] = useState(false);
  const dexScreenerUrl = `https://dexscreener.com/solana/${contractAddress}`;
  const solscanUrl = `https://solscan.io/address/${contractAddress}`;

  const handleCopy = () => {
    if (!contractAddress) return;
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied" state after 2 seconds
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4 flex flex-col gap-3">
      {/* Token Info */}
      <div>
        <p className="text-lg font-semibold text-black">{name || "Unknown"} ({symbol || "N/A"})</p>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <a
            href={solscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            CA:
          </a>
          <span className="break-all">{contractAddress}</span>
          <button onClick={handleCopy} className="ml-1 text-gray-500 hover:text-black transition">
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-600" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Links + AI Button Layout */}
      <div className="flex items-center justify-between">
        {/* External Links */}
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
