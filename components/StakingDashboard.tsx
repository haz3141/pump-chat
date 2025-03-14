import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import useDeFiData from "@/hooks/useDeFiData";

interface StakingDashboardProps {
  contractAddress?: string;
}

const StakingDashboard: React.FC<StakingDashboardProps> = ({ contractAddress }) => {
  const { publicKey } = useWallet();
  const { tokens } = useUserTokens();

  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
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

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-full md:w-[400px] h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-base font-semibold">Select Token to Stake:</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={selectedTokenId || ""}
          onChange={(e) => setSelectedTokenId(e.target.value)}
        >
          <option value="">Choose Token from Your Wallet</option>
          {tokens.map((token) => (
            <option key={token.id} value={token.id}>
              {token.content.metadata.symbol} ({token.content.metadata.name}) – {(
                token.token_info.balance /
                10 ** token.token_info.decimals
              ).toLocaleString()}{" "}
              {token.content.metadata.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-bold text-gray-900">{tokenName}</h2>
        <p className="text-teal-600 font-semibold text-base">${tokenSymbol}</p>
        {contractAddress && <p className="text-sm text-gray-500 break-all">{contractAddress}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-600 font-medium">Available Balance:</span>
          <span className="text-gray-900 font-semibold">
            {availableBalance.toLocaleString()} {tokenSymbol}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Math.min(Number(e.target.value), availableBalance))}
            className="w-full border border-gray-300 rounded-lg p-3 pr-12 text-gray-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter amount"
            min="0"
            max={availableBalance}
          />
          <button
            onClick={handleMaxStake}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 text-base font-bold hover:text-teal-700 transition"
          >
            Max
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-base bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col">
          <span className="text-gray-600">Estimated Rewards:</span>
          <span className="text-gray-900 font-bold">{finalRewards} $KULT / year</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Governance Power:</span>
          <span className="text-teal-600 font-bold">{governancePower}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Lockup Period:</span>
          <span className="text-gray-900 font-bold">{lockupPeriod} days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">KULT Multiplier:</span>
          <span className="text-teal-600 font-bold">x{kultMultiplier}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-gray-600">Total Community Staked:</span>
        <span className="text-gray-900 font-bold">{totalCommunityStaked} $KULT</span>
        <span className="text-gray-900 font-bold">{communityStakerCount} users</span>
      </div>

      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-base font-semibold text-gray-900">Your Staking Stats:</h3>
        <p className="text-gray-600">You have staked: {stakeAmount} $KULT</p>
        <p className="text-gray-600">Total rewards earned: {yourRewardsEarned} $KULT</p>
      </div>

      <div className="flex gap-3">
        <motion.button className="flex-1 py-3 text-base rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition">
          Stake
        </motion.button>
        <motion.button className="flex-1 py-3 text-base rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition">
          Unstake
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StakingDashboard;
