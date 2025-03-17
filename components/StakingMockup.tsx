"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import DynamicBitcoinWalletButton from "@/components/DynamicBitcoinWalletButton";

interface StakingMockupProps {
  tokenSymbol: string;
  availableBalance?: number;
}

const StakingMockup: React.FC<StakingMockupProps> = ({ tokenSymbol, availableBalance = 1000 }) => {
  const { publicKey } = useWallet();
  const [rewardStatus, setRewardStatus] = useState<string>("Idle");
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [stacksAddress, setStacksAddress] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [dynamicReward, setDynamicReward] = useState<number>(0);
  const apy = 20;
  const updateInterval = 0.5;

  const governancePower = useMemo(() => (stakeAmount > 0 ? (stakeAmount * 1.5).toFixed(2) : "0"), [stakeAmount]);
  const estimatedYearlyKULT = useMemo(() => ((stakeAmount * apy) / 100).toFixed(2), [stakeAmount]);

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

  const handleStake = () => {
    if (stakeAmount > 0) {
      setIsStaking(true);
      setRewardStatus("Staking in progress...");
    } else {
      setRewardStatus("Error: Enter an amount to stake.");
    }
  };

  const handleMaxStake = () => setStakeAmount(availableBalance);

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
        setTransactionId(data.txid);
        setRewardStatus(`Success: Tx ID ${data.txid}`);
        setDynamicReward(0);
        setIsStaking(false);
      } else {
        setRewardStatus(`Error: ${data.error}`);
      }
    } catch (error: unknown) {
      setRewardStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <motion.div
      className="p-2 flex flex-col gap-2 w-full h-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wallet Connect with space below */}
      <div className="flex-shrink-0 mb-2">
        <DynamicBitcoinWalletButton setStacksAddress={setStacksAddress} />
      </div>

      {/* Title with space above */}
      <h2 className="text-base font-semibold text-gray-900 text-center mt-2">
        Stake {tokenSymbol}
      </h2>

      {/* Middle content - stretch to fill remaining space */}
      <div className="flex-1 flex flex-col gap-2 min-h-0">
        <div className="flex justify-between text-xs">
          <span className="text-teal-600 font-medium">Available:</span>
          <span className="text-gray-900">{availableBalance.toLocaleString()} {tokenSymbol}</span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Math.min(Number(e.target.value), availableBalance))}
            className="w-full border border-gray-300 rounded-md p-2 pr-12 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
            placeholder="Enter amount"
            min="0"
            max={availableBalance}
          />
          <button
            onClick={handleMaxStake}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-600 text-xs hover:text-teal-700"
          >
            Max
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-2 rounded-md">
          <div>
            <span className="text-teal-600 font-medium">Yearly Rewards:</span>
            <span className="text-gray-900 font-bold">{estimatedYearlyKULT} $KULT</span>
          </div>
          <div>
            <span className="text-teal-600 font-medium">Gov Power:</span>
            <span className="text-teal-600 font-bold">{governancePower}</span>
          </div>
        </div>

      </div>

      {/* Buttons and Status - fixed at bottom */}
      <div className="flex-shrink-0 flex flex-col gap-2">
        <motion.button
          onClick={handleStake}
          disabled={isStaking}
          className={`py-2 text-sm rounded-md transition ${isStaking ? "bg-gray-500 text-white cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
        >
          {isStaking ? "Staking..." : "Stake"}
        </motion.button>
        <motion.button
          onClick={handleRewardUser}
          className={`py-2 text-sm rounded-md transition ${isStaking ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-gray-500 text-white cursor-not-allowed"}`}
          disabled={!isStaking}
        >
          {isStaking ? `Claim ${dynamicReward.toFixed(6)} KULT` : "Stake to Claim"}
        </motion.button>
        <div className="text-xs text-gray-900">
          Status: {transactionId ? (
            <a
              href={`https://explorer.hiro.so/txid/${transactionId}?chain=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline hover:text-teal-700"
            >
              {transactionId.slice(0, 4)}...{transactionId.slice(-4)}
            </a>
          ) : rewardStatus === "Error: Connect Solana wallet first." ||
            rewardStatus === "Error: Connect your Stacks wallet first." ||
            rewardStatus === "Error: Start staking first." ||
            rewardStatus.startsWith("Error:") ? (
            <span className="text-red-600">{rewardStatus}</span>
          ) : (
            <span className="text-gray-900">{rewardStatus}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StakingMockup;