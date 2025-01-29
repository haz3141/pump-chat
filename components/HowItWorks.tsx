// components/HowItWorks.tsx
"use client"; // Required for animations

import { motion } from "framer-motion";
import { WalletIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"; // ✅ Corrected import path for Heroicons v2

const steps = [
    {
        title: "Connect Your Wallet",
        description: "Start by connecting your Solana wallet securely.",
        icon: WalletIcon, // ✅ Use Heroicons v2
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
        <section id="how-it-works" className="py-16 bg-gray-900 text-white text-center px-6">
            {/* Section Title */}
            <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                How It Works
            </motion.h2>

            {/* Steps Grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="p-6 rounded-lg bg-gray-800 shadow-lg flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* ✅ Use Heroicons for scalable SVG icons */}
                        <step.icon className="w-16 h-16 text-blue-400 mb-4" />

                        {/* Step Title */}
                        <h3 className="text-2xl font-semibold">{step.title}</h3>

                        {/* Description */}
                        <p className="mt-2 text-gray-400">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
