// components/StakingMockup.tsx

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import DynamicBitcoinWalletButton from "@/components/DynamicBitcoinWalletButton";

/**
 * Staking Mockup Component
 * - A **compact staking module** designed for **chat integration**.
 * - Uses **predefined token details** via `StakingMockupProps`.
 * - Fully mirrors the **StakingDashboard** functionality.
 */

interface StakingMockupProps {
  tokenSymbol: string;
  availableBalance?: number;
}

const StakingMockup: React.FC<StakingMockupProps> = ({ tokenSymbol, availableBalance = 1000 }) => {
  const { publicKey } = useWallet();

  // ✅ UI State Management
  const [rewardStatus, setRewardStatus] = useState<string>("Idle");
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [stacksAddress, setStacksAddress] = useState<string>(""); // ✅ Stacks Wallet Address
  const [transactionId, setTransactionId] = useState<string | null>(null); // ✅ Store TX ID for Link

  // ✅ Staking Parameters
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [dynamicReward, setDynamicReward] = useState<number>(0); // ✅ Live Reward Growth
  const apy = 20;
  const updateInterval = 0.5; // ✅ Faster update interval

  // ✅ Governance Power Calculation
  const governancePower = useMemo(() => {
    return stakeAmount > 0 ? (stakeAmount * 1.5).toFixed(2) : "0";
  }, [stakeAmount]);

  // ✅ Estimated Yearly KULT Rewards
  const estimatedYearlyKULT = useMemo(() => {
    return ((stakeAmount * apy) / 100).toFixed(2);
  }, [stakeAmount]);

  // ✅ Start Reward Accumulation on Stake
  useEffect(() => {
    if (isStaking && stakeAmount > 0) {
      const interval = setInterval(() => {
        const yearlyReward = (stakeAmount * apy) / 100;
        const rewardPerSecond = yearlyReward / (365 * 24 * 60 * 60);
        setDynamicReward((prev) => prev + rewardPerSecond * updateInterval);
      }, updateInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [isStaking, stakeAmount]);

  // ✅ Handle Staking
  const handleStake = () => {
    if (stakeAmount > 0) {
      setIsStaking(true);
      setRewardStatus("Staking in progress... Rewards accumulating...");
    } else {
      setRewardStatus("Error: Enter an amount to stake.");
    }
  };

  // ✅ Handle Max Stake
  const handleMaxStake = () => setStakeAmount(availableBalance);

  // ✅ Handle Claim Rewards
  const handleRewardUser = async () => {
    if (!publicKey) {
      setRewardStatus("Error: Connect Solana wallet first.");
      return;
    }
    if (!stacksAddress) {
      setRewardStatus("Error: Connect your Stacks wallet first.");
      return;
    }
    if (!isStaking) {
      setRewardStatus("Error: Start staking first.");
      return;
    }

    const rewardAmount = Math.round(dynamicReward * 1_000_000);

    setRewardStatus("Pending...");
    try {
      const response = await fetch("/api/reward-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stacksAddress, rewardAmount }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransactionId(data.txid); // ✅ Store TX ID for Explorer Link
        setRewardStatus(`Success: Tx ID ${data.txid}`);
        setDynamicReward(0);
        setIsStaking(false); // ✅ Reset Staking Button
      } else {
        setRewardStatus(`Error: ${data.error}`);
      }
    } catch (error: unknown) {
      setRewardStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stacks Wallet Connection */}
      <DynamicBitcoinWalletButton setStacksAddress={setStacksAddress} />

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
      <div className="grid grid-cols-2 gap-4 text-base bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col">
          <span className="text-gray-600">Yearly Estimated Rewards:</span>
          <span className="text-gray-900 font-bold">{estimatedYearlyKULT} $KULT</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Governance Power:</span>
          <span className="text-teal-600 font-bold">{governancePower}</span>
        </div>
      </div>

      {/* Stake & Claim Rewards Buttons */}
      <motion.button
        onClick={handleStake}
        disabled={isStaking}
        className={`py-3 font-bold rounded-lg transition ${
          isStaking ? "bg-gray-500 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isStaking ? "Staking In Progress..." : "Stake"}
      </motion.button>

      <motion.button
        onClick={handleRewardUser}
        className={`py-3 font-bold rounded-lg transition ${
          isStaking ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-500 text-white cursor-not-allowed"
        }`}
        disabled={!isStaking}
      >
        {isStaking ? `Claim ${dynamicReward.toFixed(6)} KULT Rewards` : "Stake to Claim"}
      </motion.button>

      {/* Reward Status */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        Reward Status:{" "}
        {transactionId ? (
          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
            <span className="text-gray-700">Success: Tx ID</span>
            <a
              href={`https://explorer.hiro.so/txid/${transactionId}?chain=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline truncate max-w-[180px] md:max-w-[250px] overflow-hidden"
              title={transactionId}
            >
              {transactionId.slice(0, 6)}...{transactionId.slice(-6)}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(transactionId)}
              className="text-gray-500 hover:text-gray-700 transition"
              title="Copy Transaction ID"
            >
              📋
            </button>
          </div>
        ) : (
          rewardStatus
        )}
      </div>
    </motion.div>
  );
};

export default StakingMockup;
