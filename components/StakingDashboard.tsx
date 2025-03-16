"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import useDeFiData from "@/hooks/useDeFiData";
import { STACKS_TESTNET } from "@stacks/network";
import { makeContractCall, broadcastTransaction, uintCV, standardPrincipalCV, TxBroadcastResultOk, TxBroadcastResultRejected } from "@stacks/transactions";

// Load environment variables
if (typeof window === "undefined") {
  require("dotenv").config();
}

interface StakingDashboardProps {
  contractAddress?: string;
}

const StakingDashboard: React.FC<StakingDashboardProps> = ({ contractAddress }) => {
  const { publicKey } = useWallet();
  const { tokens } = useUserTokens();

  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [stacksAddress, setStacksAddress] = useState<string>("");
  const [rewardStatus, setRewardStatus] = useState<string>("Idle");
  const selectedToken = tokens.find((t) => t.id === selectedTokenId);

  const tokenName = selectedToken?.content?.metadata?.name || "Choose Token from Wallet";
  const tokenSymbol = selectedToken?.content?.metadata?.symbol || "---";
  const availableBalance = selectedToken ? selectedToken.token_info.balance / 10 ** selectedToken.token_info.decimals : 0;

  const { data: defiData } = useDeFiData("solana", selectedTokenId || "");
  const tokenPrice = defiData?.data?.attributes?.price_usd ? parseFloat(defiData.data.attributes.price_usd) : 0;
  const tokenFDV = defiData?.data?.attributes?.fdv_usd ? parseFloat(defiData.data.attributes.fdv_usd) : 5000000;

  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const apy = 20;
  const lockupPeriod = 30;
  const totalStaked = 500000;
  const totalStakers = 2000;
  const totalCommunityStaked = 1000000;
  const communityStakerCount = 1500;

  const governancePower = useMemo(() => {
    if (!stakeAmount) return "0";
    return (stakeAmount * 1.5).toFixed(2);
  }, [stakeAmount]);

  const kultMultiplier = useMemo(() => {
    const stakingRatio = totalStaked / tokenFDV;
    const stakerImpact = totalStakers / 10000;
    return (1 + stakingRatio * 0.5 + stakerImpact * 0.5).toFixed(2);
  }, [totalStaked, totalStakers, tokenFDV]);

  const yourRewardsEarned = useMemo(() => {
    return ((stakeAmount * apy * parseFloat(kultMultiplier)) / 100).toFixed(2);
  }, [stakeAmount, apy, kultMultiplier]);

  const finalRewards = ((stakeAmount * apy * parseFloat(kultMultiplier)) / 100).toFixed(2);

  const handleMaxStake = () => setStakeAmount(availableBalance);

  // Stacks Testnet config
  const network = STACKS_TESTNET;
  const contractAddressStacks = "ST2PQ57VQVWPS69J5W91EM6BXE75QD2Q701ANXXKZ"; // Deployed address
  const contractName = "kult-token";
  const ownerPrivateKey = process.env.STACKS_PRIVATE_KEY || ""; // Load from environment variable

  const handleRewardUser = async () => {
    if (!stacksAddress) {
      setRewardStatus("Error: Enter a Stacks address");
      return;
    }
    if (!publicKey) {
      setRewardStatus("Error: Connect Solana wallet first");
      return;
    }
    if (!ownerPrivateKey) {
      setRewardStatus("Error: Private key missing in environment");
      return;
    }

    const rewardAmount = Math.round(parseFloat(yourRewardsEarned) * 1_000_000); // Convert to micro-kult

    const txOptions = {
      contractAddress: contractAddressStacks,
      contractName,
      functionName: "reward-user",
      functionArgs: [uintCV(rewardAmount), standardPrincipalCV(stacksAddress)],
      network,
      senderKey: ownerPrivateKey,
    };

    setRewardStatus("Pending...");
    try {
      const transaction = await makeContractCall(txOptions);
      const broadcastResult = await broadcastTransaction({ transaction, network });

      if ((broadcastResult as TxBroadcastResultOk).txid) {
        const txid = (broadcastResult as TxBroadcastResultOk).txid;
        setRewardStatus(`Success: Tx ID ${txid}`);
      } else {
        const rejectedResult = broadcastResult as TxBroadcastResultRejected;
        setRewardStatus(`Error: ${rejectedResult.reason || "Broadcast failed"}`);
      }
    } catch (error: any) {
      setRewardStatus(`Error: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-full md:w-[400px] h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-base font-semibold">Your Stacks Address (for KULT rewards):</label>
        <input
          type="text"
          value={stacksAddress}
          onChange={(e) => setStacksAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter your Stacks address (e.g., ST1PQHQ...)"
        />
      </div>

      <motion.button
        onClick={handleRewardUser}
        className="py-3 text-base rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
      >
        Claim {yourRewardsEarned} KULT Rewards
      </motion.button>
      <p className="text-sm text-gray-600">Reward Status: {rewardStatus}</p>
    </motion.div>
  );
};

export default StakingDashboard;
