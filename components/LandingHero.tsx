// components/LandingHero.tsx
// The Hero Section with a gradient title, animations, and responsive styling

"use client"; // Ensures this component runs on the client side

import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <section id="hero" className="h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
      {/* Animated Heading */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Pump Chat
      </motion.h1>

      {/* Subtitle with fade-in effect */}
      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-300 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A decentralized chat experience for token communities.
      </motion.p>

      {/* Call to Action Button */}
      <motion.a
        href="#about"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Get Started
      </motion.a>
    </section>
  );
}
