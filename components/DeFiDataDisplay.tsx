/**
 * File: /components/DeFiDataDisplay.tsx
 * @description A responsive DeFi data display component with a price trend chart,
 *              designed to fully fill its container's vertical space with adjusted font sizes.
 * @author [Your Name]
 * @version 1.4
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

/**
 * DeFiDataDisplay Component
 * @param {DeFiDataDisplayProps} props - Component props
 * @returns {JSX.Element} Rendered DeFi data interface that fills its container
 */
const DeFiDataDisplay: React.FC<DeFiDataDisplayProps> = ({ data, loading, error }) => {
  if (loading) return <div className="bg-white rounded-lg shadow-md p-4 text-center text-gray-900 w-full" aria-live="polite">Loading market data...</div>;
  if (error) return <div className="bg-white rounded-lg shadow-md p-4 text-center text-red-600 font-medium w-full" aria-live="polite">Error: {error}</div>;
  if (!data?.data?.attributes) return null;

  const tokenData = data.data.attributes;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 w-full min-h-0 flex-1">
      {/* Token Header - Flexible height */}
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 text-center sm:text-lg" role="heading">
          {tokenData.name} <span className="text-teal-600">(${tokenData.symbol})</span>
        </h2>
      </div>

      {/* Responsive Price Trend Chart - Flexible height */}
      <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 240 100" preserveAspectRatio="none">
          {/* Grid Background */}
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#e5e7eb" strokeDasharray="3,3" />
          ))}
          {/* Realistic fluctuating trend */}
          <polyline
            points="0,80 15,74 30,68 45,73 60,58 75,63 90,50 105,55 120,48 135,52 150,45 165,50 180,38 195,40 210,35 225,30 240,33"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute top-1 left-2 text-sm text-gray-500 sm:text-xs">24h Trend</div>
      </div>

      {/* DeFi Data Grid - Flexible height */}
      <div className="flex-1 grid grid-cols-2 gap-2 text-base text-gray-900 sm:text-sm sm:gap-1">
        <div className="col-span-2">
          <span className="font-medium text-teal-600">Price</span>
          <p className="text-xl font-bold sm:text-lg">
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

      {/* Long & Short Buttons - Flexible height */}
      <div className="flex-shrink-0 flex gap-3 sm:gap-2">
        <button
          className="flex-1 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-base sm:text-sm sm:py-2"
          aria-label={`Long ${tokenData.symbol} position`}
        >
          Long {tokenData.symbol}
        </button>
        <button
          className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-base sm:text-sm sm:py-2"
          aria-label={`Short ${tokenData.symbol} position`}
        >
          Short {tokenData.symbol}
        </button>
      </div>
    </div>
  );
};

export default DeFiDataDisplay;