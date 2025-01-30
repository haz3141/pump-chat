/**
 * File: /components/Footer.tsx
 *
 * 🎨 Premium Footer:
 * - **Refined typography & spacing** for a polished, modern look.
 * - **Floating glow & gradient background** for a premium aesthetic.
 * - **Uses Heroicons for consistency across the project**.
 */

"use client";

import { motion } from "framer-motion";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"; // ✅ Heroicons for consistency

export default function Footer() {
    return (
        <footer className="relative py-12 bg-gradient-to-t from-black via-gray-900 to-gray-900 text-gray-400 text-center px-6 overflow-hidden">
            {/* 🔹 Floating Background Glow for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)] opacity-50 z-0"></div>

            {/* 🔹 Footer Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* 🔹 Brand Logo / Name */}
                <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
                    Pump.Chat
                </h2>

                {/* 🔹 Social Media Icons */}
                <div className="flex space-x-6">
                    {/* X.com (Twitter) Icon */}
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                        <XMarkIcon className="w-7 h-7" /> {/* ✅ Updated for X.com */}
                    </a>

                    {/* Telegram Icon */}
                    <a
                        href="https://t.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                        <PaperAirplaneIcon className="w-7 h-7" />
                    </a>
                </div>

                {/* 🔹 Copyright Notice */}
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Pump.Chat. All rights reserved.
                </p>
            </motion.div>

            {/* 🔹 Subtle Top Gradient for Seamless CTA Transition */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-900 to-transparent"></div>
        </footer>
    );
}
