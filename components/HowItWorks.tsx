/**
 * File: /components/HowItWorks.tsx
 *
 * 🎨 How It Works Section:
 * - Interactive steps guiding the user through the token-gated chat process.
 * - Smooth animations for each step with icons and descriptions.
 * - Responsive layout adapting to different screen sizes.
 * - Includes gradient backgrounds to ensure visual consistency with the rest of the page.
 */

"use client"; // Required for animations

import { motion } from "framer-motion";
import { WalletIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

// 🔹 Steps Array: Each step includes an icon, title, and description for the process
const steps = [
    {
        title: "Connect Your Wallet",
        description: "Start by connecting your Solana wallet securely.",
        icon: WalletIcon,
    },
    {
        title: "Select a Chat",
        description: "Choose a token-based chat room to join the discussion.",
        icon: ChatBubbleBottomCenterTextIcon,
    },
    {
        title: "Start Chatting",
        description: "Engage in real-time discussions with token holders.",
        icon: PaperAirplaneIcon,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-24 bg-black text-white text-center px-6">
            {/* 🔹 Layer 1: Gradient Background with Reduced Height & Transparency */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-black to-black/0"></div>

            {/* 🔹 Section Title with Gradient Text */}
            <motion.h2
                className="relative z-10 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text mt-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                How It Works
            </motion.h2>

            {/* 🔹 Steps Grid: Responsive layout for the steps */}
            <div className="relative z-10 mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="p-6 rounded-xl bg-gray-900/70 backdrop-blur-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform hover:shadow-xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* 🔹 Step Icon with Glow */}
                        <step.icon className="w-16 h-16 text-blue-400 mb-4 drop-shadow-md" />

                        {/* 🔹 Step Title */}
                        <h3 className="text-2xl font-semibold">{step.title}</h3>

                        {/* 🔹 Step Description */}
                        <p className="mt-2 text-gray-400">{step.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* 🔹 Layer 2: Gradient Transition to Balance Visuals */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-black to-black/0"></div>
        </section>
    );
}
