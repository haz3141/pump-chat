/**
 * File: /components/ChatHeader.tsx
 * Description:
 * - Chat header for the Kulture.Fun chat page.
 * - Displays the title, navigation links, and wallet connect button.
 * - Responsive and mobile-friendly.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DynamicWalletButton from "@/components/DynamicWalletButton";
import Button from "@/components/Button";
import Link from "next/link";

const ChatHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-[80vw] mx-auto flex flex-col items-center mb-4 p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-md mt-0">
      {/* Page Title with Correct Font */}
      <Link
        href="/chat"
        className="text-4xl font-bold text-white text-center cursor-pointer mt-4"
        style={{ fontFamily: "var(--font-press-start)" }}
      >
        KULTURE.FUN CHAT
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-3xl mt-2 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation Bar + Wallet Button (Desktop) */}
      <nav
        className="hidden md:flex justify-center items-center gap-4 mt-2 w-full"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Button
          href="/explore"
          variant="custom"
          size="md"
          className="text-white hover:text-gray-200 transition"
        >
          Explore
        </Button>
        <Button
          href="/leaderboard"
          variant="custom"
          size="md"
          className="text-white hover:text-gray-200 transition"
        >
          Leaderboard
        </Button>
        <Button
          href="/settings"
          variant="custom"
          size="md"
          className="text-white hover:text-gray-200 transition"
        >
          Settings
        </Button>

        {/* Push Wallet Button to the Far Right */}
        <div className="ml-auto">
          <DynamicWalletButton />
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden flex flex-col items-center gap-4 mt-4 w-full bg-black/90 text-white py-4 rounded-lg shadow-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Button
              href="/explore"
              variant="custom"
              size="md"
              className="text-white hover:text-gray-200 transition"
            >
              Explore
            </Button>
            <Button
              href="/leaderboard"
              variant="custom"
              size="md"
              className="text-white hover:text-gray-200 transition"
            >
              Leaderboard
            </Button>
            <Button
              href="/settings"
              variant="custom"
              size="md"
              className="text-white hover:text-gray-200 transition"
            >
              Settings
            </Button>

            <DynamicWalletButton />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ChatHeader;
