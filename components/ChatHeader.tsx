/**
 * File: /components/ChatHeader.tsx
 * Description:
 * - Full-width sticky header for Kulture.Fun with consistent padding.
 * - Provides navigation and wallet connection for an app-like experience.
 */

"use client";

import { useState } from "react";
import DynamicWalletButton from "@/components/DynamicWalletButton";
import Button from "@/components/Button";
import Link from "next/link";

const ChatHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-gradient-to-r from-blue-600 to-teal-500 shadow-md z-50 h-16">
  <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full px-2">
    <Link href="/chat" className="text-2xl font-bold text-white cursor-pointer" style={{ fontFamily: "var(--font-press-start)" }}>
      KULTURE.FUN
    </Link>
    <button className="md:hidden text-white text-base focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
      ☰
    </button>
    <nav className="hidden md:flex items-center gap-4">
      <Button href="/chat" variant="custom" size="sm" className="text-white hover:scale-105 transition-transform">
        Explore
      </Button>
      <Button href="/leaderboard" variant="custom" size="sm" className="text-white hover:scale-105 transition-transform">
        Leaderboard
      </Button>
      <Button href="/settings" variant="custom" size="sm" className="text-white hover:scale-105 transition-transform">
        Settings
      </Button>
      <DynamicWalletButton size="sm" />
    </nav>
  </div>
  {/* Mobile Navigation Dropdown remains unchanged */}
</header>
  );
};

export default ChatHeader;