/**
 * File: /components/StakingMockup.tsx
 *
 * Description:
 * - Users stake the current chat token and earn $KULT.
 * - Displays estimated rewards based on staking amount.
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface StakingMockupProps {
  tokenSymbol: string; // Token of the current chat
}

const StakingMockup: React.FC<StakingMockupProps> = ({ tokenSymbol }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const apy = 20; // Fixed APY for mockup
  const estimatedRewards = ((stakeAmount * apy) / 100).toFixed(2);

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Staking Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Staking</h2>

      {/* Stake Amount Input */}
      <label className="block text-sm text-gray-600 mb-1">
        Stake {tokenSymbol}
      </label>
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(Number(e.target.value))}
        className="w-full p-2 border rounded-lg text-sm mb-3"
        placeholder="Enter amount"
      />

      {/* Estimated Rewards */}
      <div className="bg-gray-100 p-3 rounded-lg text-sm mb-3">
        <p className="text-gray-700">Estimated Rewards</p>
        <p className="font-medium text-gray-900">{estimatedRewards} $KULT / year</p>
      </div>

      {/* Stake & Unstake Buttons */}
      <div className="flex justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
        >
          Stake
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
        >
          Unstake
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StakingMockup;
