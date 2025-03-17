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
    <div className="p-3 pb-1 flex flex-col gap-3 bg-teal-50 rounded-lg shadow-sm z-10 relative transform scale-90"> {/* Added transform scale */}
      {/* Token Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900"> {/* Reduced font size */}
          {name || "Unknown"} <span className="text-teal-600 text-sm">(${symbol || "N/A"})</span> {/* Reduced symbol text size */}
        </h2>
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1"> {/* Reduced font size and margin */}
          <a href={solscanUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-semibold">
            CA:
          </a>
          <span className="break-all">{contractAddress}</span>
          <button onClick={handleCopy} className="ml-1 text-gray-500 hover:text-gray-700"> {/* Reduced margin */}
            {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <ClipboardIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Links and Button */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs"> {/* Reduced gap and font size */}
          <a href={dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
            DexScreener
          </a>
          <a href="#" className="text-teal-600 hover:text-teal-700">X</a>
          <a href="#" className="text-teal-600 hover:text-teal-700">Telegram</a>
          <a href="#" className="text-teal-600 hover:text-teal-700">Website</a>
        </div>
        <Button className="py-1 px-3 text-xs rounded-lg bg-teal-600 text-white hover:bg-teal-700" disabled> {/* Reduced button size and padding */}
          🤖 Ask AI (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default ChatContractInfo;
