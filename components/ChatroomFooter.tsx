/**
 * File: /components/ChatroomFooter.tsx
 * 
 * Description:
 * - A **thin, non-intrusive footer** designed to match the modern app-like UI.
 * - Provides **quick access links** and essential branding.
 * - Uses **minimal space** while maintaining functionality.
 * 
 * Author: [Your Name]
 * Version: 1.0
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ChatroomFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm py-3 px-6 flex items-center justify-between shadow-md">
      {/* Left Side - Branding */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-white">Kulture.Fun</span>
        <span className="text-xs text-gray-400">© {new Date().getFullYear()}</span>
      </div>

      {/* Center - Quick Links */}
      <div className="flex gap-4">
        <Link href="/explore" className="hover:text-teal-400 transition">Explore</Link>
        <Link href="/leaderboard" className="hover:text-teal-400 transition">Leaderboard</Link>
        <Link href="/settings" className="hover:text-teal-400 transition">Settings</Link>
        <Link href="/privacy-policy" className="hover:text-teal-400 transition">Privacy</Link>
      </div>

      {/* Right Side - Social Links */}
      <div className="flex gap-3">
        <Link href="https://x.com/yourprofile" target="_blank">
          <motion.span whileHover={{ scale: 1.1 }} className="hover:text-blue-400 transition">X</motion.span>
        </Link>
        <Link href="https://discord.com/yourserver" target="_blank">
          <motion.span whileHover={{ scale: 1.1 }} className="hover:text-purple-400 transition">Discord</motion.span>
        </Link>
        <Link href="https://t.me/yourtelegram" target="_blank">
          <motion.span whileHover={{ scale: 1.1 }} className="hover:text-teal-400 transition">Telegram</motion.span>
        </Link>
      </div>
    </footer>
  );
};

export default ChatroomFooter;
