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
  if (loading) return <p className="text-black">Loading market data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const tokenData = data?.data?.attributes;
  if (!tokenData) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-full flex flex-col flex-grow">
      <h2 className="text-xl font-semibold text-black mb-2 text-center">
        {tokenData.symbol} Market Overview
      </h2>
      
      <div className="grid grid-cols-2 gap-4 text-black flex-grow">
        <p><strong>Price (USD):</strong> ${parseFloat(tokenData.price_usd).toFixed(4)}</p>
        <p><strong>24h Volume:</strong> ${parseFloat(tokenData.volume_usd.h24).toLocaleString()}</p>
        <p><strong>Total Reserve:</strong> ${parseFloat(tokenData.total_reserve_in_usd).toLocaleString()}</p>
        <p><strong>FDV:</strong> ${parseFloat(tokenData.fdv_usd).toLocaleString()}</p>
        <p><strong>Market Cap:</strong> {tokenData.market_cap_usd ? `$${parseFloat(tokenData.market_cap_usd).toLocaleString()}` : "N/A"}</p>
      </div>
  
      {/* Mock Chart */}
      <div className="mt-4 w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
        {/* Example of a small mock chart (can be replaced with an actual chart later) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 40">
          <polyline
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            points="0,30 10,25 20,15 30,20 40,10 50,25 60,18 70,12 80,25 90,18 100,30"
          />
        </svg>
      </div>
  
      {/* Buy/Sell Buttons */}
      <div className="mt-4 flex gap-4">
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Buy {tokenData.symbol}
        </button>
        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Sell {tokenData.symbol}
        </button>
      </div>
    </div>
  );
};

export default DeFiDataDisplay;
