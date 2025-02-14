/**
 * File: /components/DeFiDataDisplay.tsx
 * Description:
 * - Component to display DeFi data fetched from Gecko Terminal API.
 */

import React from "react";

interface TokenAttributes {
  name: string;
  symbol: string;
  price_usd: string; // API returns as a string
  volume_usd: {
    h24: string; // API returns as a string
  };
  total_reserve_in_usd: string; // API returns as a string
  fdv_usd: string; // API returns as a string
  market_cap_usd?: string | null; // API returns as a string or null
}

interface DeFiData {
  data: {
    attributes: TokenAttributes;
  };
}

interface DeFiDataDisplayProps {
  data: DeFiData | null;
  loading: boolean;
  error: string | null;
}

const DeFiDataDisplay: React.FC<DeFiDataDisplayProps> = ({ data, loading, error }) => {
  if (loading) return <p className="text-black">Loading DeFi data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const tokenData = data?.data?.attributes;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 text-black">DeFi Data</h2>
      <p className="text-black">Name: {tokenData?.name}</p>
      <p className="text-black">Symbol: {tokenData?.symbol}</p>
      <p className="text-black">
        Price (USD): ${parseFloat(tokenData?.price_usd || "0").toFixed(4)}
      </p>
      <p className="text-black">
        Volume (24h): ${parseFloat(tokenData?.volume_usd.h24 || "0").toLocaleString()}
      </p>
      <p className="text-black">
        Total Reserve (USD): ${parseFloat(tokenData?.total_reserve_in_usd || "0").toLocaleString()}
      </p>
      <p className="text-black">
        Fully Diluted Valuation (USD): ${parseFloat(tokenData?.fdv_usd || "0").toLocaleString()}
      </p>
      <p className="text-black">
        Market Cap (USD): {tokenData?.market_cap_usd
          ? `$${parseFloat(tokenData.market_cap_usd).toLocaleString()}`
          : "N/A"}
      </p>
    </div>
  );
};

export default DeFiDataDisplay;
