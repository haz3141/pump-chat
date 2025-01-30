/**
 * File: /components/LandingHero.tsx
 *
 * 🎨 Premium Hero Section:
 * - Hero text & button animations are **in sync**.
 * - Subtitle now has a **subtle, refined glow**.
 * - Optimized for clarity, contrast, and a premium aesthetic.
 */

"use client";

import { motion } from "framer-motion";
import Button from "./Button"; // Import reusable button

export default function LandingHero() {
  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* 🔹 Background Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.9)_100%)]" />

      {/* 🔹 Hero Title with Moving Gradient & Soft Neon Glow */}
      <motion.h1
        className="relative z-10 text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text-glow subtle-glow"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Pump.Chat
      </motion.h1>

      {/* 🔹 Subtitle (Now with Soft Glow for Premium Look) */}
      <motion.p
        className="relative z-10 mt-4 hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        The Future of Token-Gated Communication.
        Secure, Decentralized, and Built for You.
      </motion.p>

      {/* 🔹 Call to Action Button with Animated Gradient & Glow */}
      <motion.div
        layoutId="hero-button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-6 flex justify-center w-full"
      >
        <Button
          href="/chat"
          variant="custom"
          size="lg"
          className="inline-flex button-primary"
        >
          Get Started
        </Button>
      </motion.div>
    </section>
  );
}
