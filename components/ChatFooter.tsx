/**
 * File: /components/ChatFooter.tsx
 *
 * Description:
 * - Displays footer content with social links, legal links, and copyright info.
 * - Styled to blend seamlessly into the page background with subtle animations for interactivity.
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ChatFooter: React.FC = () => {
  return (
    <footer className="w-full text-gray-600 p-4 mt-4 mb-0">
      <div className="flex flex-col items-center gap-2 max-w-5xl mx-auto">
        {/* Social Links */}
        <div className="flex gap-4">
          <Link href="https://x.com/yourprofile" target="_blank">
            <motion.div
              className="text-gray-600 hover:text-teal-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              X
            </motion.div>
          </Link>
          <Link href="https://discord.com/yourserver" target="_blank">
            <motion.div
              className="text-gray-600 hover:text-teal-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              Discord
            </motion.div>
          </Link>
          <Link href="https://github.com/yourproject" target="_blank">
            <motion.div
              className="text-gray-600 hover:text-teal-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              GitHub
            </motion.div>
          </Link>
          <Link href="https://t.me/yourtelegram" target="_blank">
            <motion.div
              className="text-gray-600 hover:text-teal-600 transition"
              whileHover={{ scale: 1.1 }}
            >
              Telegram
            </motion.div>
          </Link>
        </div>

        {/* Additional Links */}
        <div className="flex gap-8 mt-2">
          <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Terms of Service
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-2 text-sm text-gray-500">
          <p>© 2025 Kulture.Fun. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ChatFooter;