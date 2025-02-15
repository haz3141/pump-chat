/**
 * File: /components/Features.tsx
 *
 * 🚀 Features Section:
 * - **Maintains gradient transition consistency** with LandingHero.
 * - Uses **balanced spacing** and refined background color.
 * - **Animations** applied to each feature for smooth transitions.
 * - Includes **responsive grid layout** to accommodate different screen sizes.
 */

"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, BoltIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function Features() {
    return (
        <section id="features" className="relative py-24 bg-gray-900 text-white text-center px-6">
            {/* 🔹 **Standardized Gradient Transition from Hero Section** */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-black/0"></div>

            {/* 🔹 Section Title with Gradient Text */}
            <motion.h2
                className="relative z-10 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text mt-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Why Choose Kulture.Fun?
            </motion.h2>

            {/* 🔹 Features Grid: Responsive layout with animation */}
            <div className="relative z-10 mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {/* 🔹 Feature 1: Secure & Private */}
                <motion.div
                    className="p-6 rounded-lg bg-gray-800 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <ShieldCheckIcon className="w-16 h-16 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-semibold">Secure & Private</h3>
                    <p className="mt-2 text-gray-400">
                        Decentralized and encrypted chats to protect your privacy.
                    </p>
                </motion.div>

                {/* 🔹 Feature 2: Instant & Scalable */}
                <motion.div
                    className="p-6 rounded-lg bg-gray-800 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <BoltIcon className="w-16 h-16 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-semibold">Instant & Scalable</h3>
                    <p className="mt-2 text-gray-400">
                        Optimized for speed and thousands of simultaneous users.
                    </p>
                </motion.div>

                {/* 🔹 Feature 3: Community-Driven */}
                <motion.div
                    className="p-6 rounded-lg bg-gray-800 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <UsersIcon className="w-16 h-16 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-semibold">Community-Driven</h3>
                    <p className="mt-2 text-gray-400">
                        Built for token holders, enabling real-time discussion.
                    </p>
                </motion.div>
            </div>

            {/* 🔹 **Consistent Fade to Black for How It Works Section** */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-gray-900 to-black"></div>
        </section>
    );
}
