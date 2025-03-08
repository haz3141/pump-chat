/**
 * File: /components/StakingMockup.tsx
 * @description A responsive staking component, ensuring proper positioning and scaling
 *              to fill vertical space alongside DeFiDataDisplay with adjusted font sizes.
 * @author [Your Name]
 * @version 1.3
 */

"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface StakingMockupProps {
  tokenSymbol: string;
  availableBalance?: number;
}

/**
 * StakingMockup Component
 * @param {StakingMockupProps} props - Component props
 * @returns {JSX.Element} Rendered staking interface
 */
const StakingMockup: React.FC<StakingMockupProps> = ({
  tokenSymbol,
  availableBalance = 1000,
}) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const apy = 20;
  const estimatedRewards = ((stakeAmount * apy) / 100).toFixed(2);

  const handleMaxStake = useCallback(() => {
    setStakeAmount(availableBalance);
  }, [availableBalance]);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 w-full min-h-0 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label={`Stake ${tokenSymbol} interface`}
    >
      {/* Centered Title */}
      <h2 className="text-xl font-bold text-gray-900 text-center sm:text-lg" role="heading">
        Stake {tokenSymbol}
      </h2>

      {/* Balance & Input */}
      <div className="flex flex-col gap-3 sm:gap-2">
        <div className="flex justify-between items-center text-base sm:text-sm">
          <span className="text-gray-600">Available Balance:</span>
          <span className="text-gray-900 font-medium">
            {availableBalance.toLocaleString()} {tokenSymbol}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) =>
              setStakeAmount(Math.min(Number(e.target.value) || 0, availableBalance))
            }
            className="w-full border border-gray-300 rounded-lg p-3 pr-16 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-base sm:p-2 sm:pr-12 sm:text-sm"
            placeholder="Enter amount"
            min="0"
            max={availableBalance}
            aria-label="Stake amount input"
          />
          <button
            onClick={handleMaxStake}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 text-base font-medium hover:text-teal-700 transition sm:right-2 sm:text-sm"
            aria-label="Set maximum stake amount"
          >
            Max
          </button>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-gray-50 p-3 rounded-lg text-base sm:p-2 sm:text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Rewards:</span>
          <span className="text-gray-900 font-semibold">
            {estimatedRewards} $KULT / year
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-500">APY:</span>
          <span className="text-teal-600 font-medium">{apy}%</span>
        </div>
      </div>

      {/* Stake & Unstake Buttons */}
      <div className="flex gap-3 sm:gap-2">
        <button
          className="flex-1 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-base sm:py-2 sm:text-sm"
          disabled={stakeAmount <= 0 || stakeAmount > availableBalance}
          aria-label="Stake token"
        >
          Stake
        </button>
        <button
          className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-base sm:py-2 sm:text-sm"
          disabled={stakeAmount <= 0}
          aria-label="Unstake token"
        >
          Unstake
        </button>
      </div>
    </motion.div>
  );
};

export default StakingMockup;