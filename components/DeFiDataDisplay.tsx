/**
 * File: /components/DeFiDataDisplay.tsx
 * Description:
 * - Displays DeFi data for a token with a mock chart and Buy/Sell buttons.
 */

import React from "react";

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
  if (loading) return <p className="chat-card text-gray-900">Loading market data...</p>;
  if (error) return <p className="chat-card text-red-500">{error}</p>;

  const tokenData = data?.data?.attributes;
  if (!tokenData) return null;

  return (
    <div className="chat-card flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">${tokenData.symbol}</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-900 flex-grow">
        <p><span className="font-semibold text-teal-600">Price (USD):</span> ${parseFloat(tokenData.price_usd).toFixed(4)}</p>
        <p><span className="font-semibold text-teal-600">24h Volume:</span> ${parseFloat(tokenData.volume_usd.h24).toLocaleString()}</p>
        <p><span className="font-semibold text-teal-600">Total Reserve:</span> ${parseFloat(tokenData.total_reserve_in_usd).toLocaleString()}</p>
        <p><span className="font-semibold text-teal-600">FDV:</span> ${parseFloat(tokenData.fdv_usd).toLocaleString()}</p>
        <p><span className="font-semibold text-teal-600">Market Cap:</span> {tokenData.market_cap_usd ? `$${parseFloat(tokenData.market_cap_usd).toLocaleString()}` : "N/A"}</p>
      </div>
      <div className="mt-4 w-full h-32 bg-gray-200 rounded-md"></div>
      <div className="mt-4 flex gap-4">
        <button className="chat-button flex-1">Buy {tokenData.symbol}</button>
        <button className="chat-button flex-1 bg-red-600 hover:bg-red-700">Sell {tokenData.symbol}</button>
      </div>
    </div>
  );
};

export default DeFiDataDisplay;