"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

// ✅ Configure App for Stacks Authentication
const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

/**
 * Bitcoin & Stacks Wallet Connection Component
 * - Connects to Leather Wallet via `@stacks/connect`
 * - Fetches & Displays User's Stacks Address (Testnet/Mainnet)
 * - Allows Users to **Connect & Disconnect**
 * - Updates the Parent Component with Stacks Address
 */
const DynamicBitcoinWalletButton = ({ setStacksAddress }: { setStacksAddress: (address: string) => void }) => {
  const [stacksAddress, setStacksAddressState] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);

  // ✅ Load Stacks Address if Already Signed In
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      console.log("🔹 Leather Wallet User Data:", userData);

      // ✅ Extract Correct Stacks Address (Testnet/Mainnet)
      const address =
        userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet || "";

      if (address) {
        console.log("✅ Stacks Address Found:", address);
        setStacksAddressState(address);
        setStacksAddress(address); // ✅ Update Parent Component
      }
    }
  }, []);

  // ✅ Handle Wallet Connection
  const handleConnect = async () => {
    setConnecting(true);

    showConnect({
      appDetails: {
        name: "Kulture.Fun",
        icon: "https://kulture.fun/favicon.ico",
      },
      userSession,
      onFinish: () => {
        setTimeout(() => {
          const userData = userSession.loadUserData();
          console.log("✅ Connected! User Data:", userData);

          // ✅ Extract Stacks Testnet Address
          const address =
            userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet || "";

          if (address) {
            console.log("✅ Updating Stacks Address:", address);
            setStacksAddressState(address);
            setStacksAddress(address);
          }

          setConnecting(false);
        }, 500); // ✅ Small delay to ensure UI updates correctly
      },
      onCancel: () => {
        console.log("❌ Connection Cancelled");
        setConnecting(false);
      },
    });
  };

  // ✅ Handle Wallet Disconnection
  const handleDisconnect = () => {
    console.log("🚨 Disconnecting Stacks Wallet...");
    userSession.signUserOut(); // ✅ Sign out from Leather Wallet
    setStacksAddressState(null); // ✅ Clear Address from State
    setStacksAddress(""); // ✅ Clear Parent Component State
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 text-base font-semibold">Your Stacks Wallet:</label>
      <div className="flex items-center gap-2">
        {/* ✅ Readonly Input Field for Stacks Address */}
        <input
          type="text"
          value={stacksAddress || ""}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 font-semibold focus:outline-none bg-gray-100"
          placeholder="Not connected"
        />
        
        {/* ✅ Show Connect or Disconnect Button Based on Connection State */}
        {!stacksAddress ? (
          <motion.button
            onClick={handleConnect}
            disabled={connecting}
            className="py-2 px-4 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {connecting ? "Connecting..." : "Connect Stacks Wallet"}
          </motion.button>
        ) : (
          <motion.button
            onClick={handleDisconnect}
            className="py-2 px-4 text-white font-bold bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default DynamicBitcoinWalletButton;
