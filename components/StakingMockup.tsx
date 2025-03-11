"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface StakingMockupProps {
  tokenSymbol: string;
  availableBalance?: number;
}

const StakingMockup: React.FC<StakingMockupProps> = ({ tokenSymbol, availableBalance = 1000 }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const apy = 20;
  const estimatedRewards = ((stakeAmount * apy) / 100).toFixed(2);

  const handleMaxStake = () => setStakeAmount(availableBalance);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Centered Title */}
      <h2 className="text-lg font-semibold text-gray-900 text-center">Stake {tokenSymbol}</h2>

      {/* Balance & Input */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Available Balance:</span>
          <span className="text-gray-900 font-medium">
            {availableBalance.toLocaleString()} {tokenSymbol}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Math.min(Number(e.target.value), availableBalance))}
            className="w-full border border-gray-300 rounded-lg p-3 pr-16 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter amount"
            min="0"
            max={availableBalance}
          />
          <button
            onClick={handleMaxStake}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 text-sm font-medium hover:text-teal-700 transition"
          >
            Max
          </button>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm flex-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Rewards:</span>
          <span className="text-gray-900 font-semibold">
            {estimatedRewards} $KULT / year
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500">APY:</span>
          <span className="text-teal-600 font-medium">{apy}%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-lg text-white font-medium bg-teal-600 hover:bg-teal-700 transition"
        >
          Stake
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition"
        >
          Unstake
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StakingMockup;
