/**
 * File: /components/ChatHeader.tsx
 * Description:
 * - Full-width sticky header for Kulture.Fun with consistent padding.
 * - Provides navigation and wallet connection for an app-like experience.
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
    <header className="w-full fixed top-0 left-0 bg-gradient-to-r from-blue-600 to-teal-500 shadow-md z-50">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-6">
        {/* Page Title */}
        <Link
          href="/chat"
          className="text-3xl md:text-4xl font-bold text-white cursor-pointer"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          KULTURE.FUN
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button href="/explore" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
            Explore
          </Button>
          <Button href="/leaderboard" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
            Leaderboard
          </Button>
          <Button href="/settings" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
            Settings
          </Button>
          <DynamicWalletButton />
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden flex flex-col items-center gap-4 backdrop-blur-md bg-black/80 text-white py-6 shadow-lg"
          >
            <Button href="/explore" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
              Explore
            </Button>
            <Button href="/leaderboard" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
              Leaderboard
            </Button>
            <Button href="/settings" variant="custom" size="md" className="text-white hover:scale-105 transition-transform">
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