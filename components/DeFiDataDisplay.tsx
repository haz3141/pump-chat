/**
 * File: /components/DeFiDataDisplay.tsx
 * Adjusted to fit within constrained height by reducing padding and spacing.
 */

import React from "react";
import ChatDefiChart from "@/components/ChatDefiChart";

interface TokenAttributes {
  name: string;
  symbol: string;
  price_usd: string;
  volume_usd: { h24: string };
  total_reserve_in_usd: string;
  fdv_usd: string;
  market_cap_usd?: string | null;
}

interface DeFiData {
  data: { attributes: TokenAttributes };
}

interface DeFiDataDisplayProps {
  data: DeFiData | null;
  loading: boolean;
  error: string | null;
}

const DeFiDataDisplay: React.FC<DeFiDataDisplayProps> = ({ data, loading, error }) => {
  if (loading)
    return <div className="p-2 text-center text-gray-900">Loading market data...</div>;
  if (error)
    return <div className="p-2 text-center text-red-600 font-medium">Error: {error}</div>;
  if (!data?.data?.attributes) return null;

  const tokenData = data.data.attributes;

  return (
    <div className="p-2 flex flex-col gap-2 w-full h-full">
      <div className="flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900 text-center">
          {tokenData.name} <span className="text-teal-600">(${tokenData.symbol})</span>
        </h2>
      </div>
      <ChatDefiChart tokenSymbol={tokenData.symbol} />
      <div className="grid grid-cols-2 gap-1 text-sm text-gray-900">
        <div className="col-span-2">
          <span className="font-medium text-teal-600">Price</span>
          <p className="text-lg font-bold">
            ${Number(tokenData.price_usd).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
          </p>
        </div>
        <div>
          <span className="font-medium text-teal-600">24h Vol</span>
          <p>${Number(tokenData.volume_usd.h24).toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-teal-600">Reserve</span>
          <p>${Number(tokenData.total_reserve_in_usd).toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-teal-600">FDV</span>
          <p>${Number(tokenData.fdv_usd).toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-teal-600">Mkt Cap</span>
          <p>{tokenData.market_cap_usd ? `$${Number(tokenData.market_cap_usd).toLocaleString()}` : "N/A"}</p>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-2">
        <button className="flex-1 py-2 rounded-md bg-teal-600 text-white text-sm hover:bg-teal-700 transition">
          Long {tokenData.symbol}
        </button>
        <button className="flex-1 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition">
          Short {tokenData.symbol}
        </button>
      </div>
    </div>
  );
};

export default DeFiDataDisplay;