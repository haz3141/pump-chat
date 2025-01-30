/**
 * File: /components/CallToAction.tsx
 *
 * 🎨 Premium Call to Action:
 * - **Smooth gradient transition** for better blending.
 * - **Balanced spacing & typography** for legibility.
 * - **Subtle glow & shadow effects** for a premium look.
 */

"use client";

import { motion } from "framer-motion";
import Button from "./Button"; // Import reusable button component

export default function CallToAction() {
    return (
        <section 
            id="about" 
            className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-700 to-purple-800 text-white text-center px-6 overflow-hidden"
        >
            {/* 🔹 Subtle Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.9)_100%)] z-0"></div>

            {/* 🔹 Floating Glow Effect */}
            <div className="absolute -top-32 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(0,0,0,0)_80%)] opacity-50 blur-3xl transform -translate-x-1/2"></div>

            {/* 🔹 Section Title */}
            <motion.h2
                className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Join the Future of Token-Based Chat
            </motion.h2>

            {/* 🔹 Subtitle (Refined for Readability) */}
            <motion.p
                className="relative z-10 mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Connect with your community like never before. Secure, decentralized, and built for you.
            </motion.p>

            {/* 🔹 CTA Button (Upgraded Hover & Shadow Effects) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-10 mt-8 inline-flex w-auto"
            >
                <Button
                    href="/chat"
                    variant="custom"
                    size="lg"
                    className="px-8 py-4 rounded-lg font-bold text-lg shadow-xl 
                    bg-black text-white border border-gray-600 hover:bg-gray-900 
                    transition-all transform duration-300 ease-out hover:scale-105"
                >
                    Get Started
                </Button>
            </motion.div>

            {/* 🔹 Gradient Transition for Seamless Flow */}
        </section>
    );
}
