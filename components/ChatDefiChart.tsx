"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * ChatDefiChart Component
 * - Displays a simple **SVG-based price trend chart**.
 * - Future upgrade: **Recharts** or **Chart.js** integration.
 */

interface ChatDefiChartProps {
  tokenSymbol: string;
}

const ChatDefiChart: React.FC<ChatDefiChartProps> = ({ tokenSymbol }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 w-full h-[200px] flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-600 text-sm text-center">24h {tokenSymbol} Price Trend</p>

      {/* 🔹 SVG-Based Price Trend Chart */}
      <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden mt-2">
        <svg className="absolute w-full h-full" viewBox="0 0 240 100" preserveAspectRatio="none">
          {/* Grid Background */}
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#e5e7eb" strokeDasharray="3,3" />
          ))}
          {/* Realistic fluctuating trend */}
          <polyline
            points="0,80 15,74 30,68 45,73 60,58 75,63 90,50 105,55 120,48 135,52 150,45 165,50 180,38 195,40 210,35 225,30 240,33"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute top-1 left-2 text-sm text-gray-500 sm:text-xs">24h Trend</div>
      </div>
    </motion.div>
  );
};

export default ChatDefiChart;
