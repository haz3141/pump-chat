/**
 * File: /components/StakingMockup.tsx
 * Description:
 * - Users stake the current chat token and earn $KULT.
 * - Displays estimated rewards based on staking amount.
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface StakingMockupProps {
  tokenSymbol: string;
}

const StakingMockup: React.FC<StakingMockupProps> = ({ tokenSymbol }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const apy = 20;
  const estimatedRewards = ((stakeAmount * apy) / 100).toFixed(2);

  return (
    <motion.div
      className="chat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4">Staking</h2>
      <label className="block text-sm text-teal-600 mb-1">Stake {tokenSymbol}</label>
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(Number(e.target.value))}
        className="chat-input mb-4"
        placeholder="Enter amount"
      />
      <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4">
        <p className="text-teal-600">Estimated Rewards</p>
        <p className="font-medium text-gray-900">{estimatedRewards} $KULT / year</p>
      </div>
      <div className="flex gap-4">
        <motion.button whileTap={{ scale: 0.95 }} className="chat-button flex-1">
          Stake
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} className="chat-button flex-1 bg-red-600 hover:bg-red-700">
          Unstake
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StakingMockup;