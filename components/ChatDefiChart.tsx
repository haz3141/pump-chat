"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * ChatDefiChart Component
 * - Displays a placeholder chart for token price history.
 * - Will later be upgraded to use **Recharts** or **Chart.js**.
 */

interface ChatDefiChartProps {
  tokenSymbol: string;
}

const ChatDefiChart: React.FC<ChatDefiChartProps> = ({ tokenSymbol }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 w-full h-[200px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-600 text-sm">Loading {tokenSymbol} price chart...</p>

      {/* 🔹 Mock Chart (Placeholder) */}
      <div className="w-full h-16 mt-3 bg-gray-200 rounded-lg relative overflow-hidden">
        <motion.div
          className="absolute w-1/3 h-full bg-teal-500 rounded-r-lg"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
};

export default ChatDefiChart;
