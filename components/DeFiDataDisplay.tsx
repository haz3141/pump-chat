/**
 * File: /components/DeFiDataDisplay.tsx
 * Description:
 * - Component to display DeFi data fetched from Gecko Terminal API.
 */

import React from "react";

interface DeFiDataDisplayProps {
  data: any; // Replace `any` with the actual type once known
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
      <p className="text-black">Price (USD): ${tokenData?.price_usd}</p>
      <p className="text-black">Volume (24h): ${tokenData?.volume_usd?.h24}</p>
      <p className="text-black">Total Reserve (USD): ${tokenData?.total_reserve_in_usd}</p>
      <p className="text-black">Fully Diluted Valuation (USD): ${tokenData?.fdv_usd}</p>
      <p className="text-black">Market Cap (USD): {tokenData?.market_cap_usd ?? "N/A"}</p>
    </div>
  );
};

export default DeFiDataDisplay;
