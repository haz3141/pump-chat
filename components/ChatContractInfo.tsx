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
    <div className="p-4 pb-2 flex flex-col gap-4 bg-teal-50 rounded-lg shadow-sm z-10 relative"> {/* Reduced bottom padding to pb-2 */}
      {/* Token Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {name || "Unknown"} <span className="text-teal-600">(${symbol || "N/A"})</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2"> {/* Reduced mt-4 to mt-2 */}
          <a href={solscanUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-semibold">
            CA:
          </a>
          <span className="break-all">{contractAddress}</span>
          <button onClick={handleCopy} className="ml-2 text-gray-500 hover:text-gray-700">
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
        <Button className="py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700" disabled>
          🤖 Ask AI (Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default ChatContractInfo;
