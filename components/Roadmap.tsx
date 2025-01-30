"use client"; // Ensures component runs on client-side for animations

import { motion } from "framer-motion";

/**
 * File: /components/Roadmap.tsx
 * 
 * Description:
 * - This component renders the 2025 roadmap in both desktop (horizontal) and mobile (vertical) views.
 * - The roadmap displays a timeline with milestone achievements for each quarter.
 * - Fix: Ensures the timeline bar is behind the circles in both views.
 */

const roadmapData = [
    {
        quarter: "Q1 2025",
        milestones: [
            "Launch of Pump.Chat’s Own Token",
            "Beta Release of AI Moderation Agents",
            "Community Growth Initiatives",
        ],
        color: "bg-purple-500 border-purple-500",
    },
    {
        quarter: "Q2 2025",
        milestones: [
            "AI Agents for Conversation Recaps",
            "Staking & Governance Features",
            "Expand Token Use Cases",
        ],
        color: "bg-blue-500 border-blue-500",
    },
    {
        quarter: "Q3 2025",
        milestones: [
            "Cross-Chain Support for More Wallets",
            "Pump.Chat Marketplace Integration",
            "Advanced AI User Assistance",
        ],
        color: "bg-green-500 border-green-500",
    },
    {
        quarter: "Q4 2025",
        milestones: [
            "Expand to More Ecosystems",
            "Begin Work on V2 of Platform",
            "Partnerships & Strategic Alliances",
        ],
        color: "bg-red-500 border-red-500",
    },
];

export default function Roadmap() {
    return (
        <section id="roadmap" className="py-20 bg-black text-white px-6">
            {/* Section Title */}
            <motion.h2
                className="text-3xl md:text-5xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                2025 Roadmap
            </motion.h2>

            {/* Desktop Timeline (Horizontal) */}
            <div className="hidden md:flex justify-between relative max-w-6xl mx-auto">
                {/* Timeline Bar (z-index ensures it's behind the circles) */}
                <div className="absolute top-8 left-0 w-full h-2 bg-gray-700 z-0"></div>

                {roadmapData.map((phase, index) => (
                    <motion.div
                        key={index}
                        className="relative flex flex-col items-center w-1/4 text-center z-10"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* Quarter Badge (Above Bar) */}
                        <div
                            className={`w-16 h-16 flex items-center justify-center text-sm font-bold rounded-full border-4 ${phase.color} text-black z-10`}
                        >
                            {phase.quarter}
                        </div>

                        {/* Milestones */}
                        <ul className="mt-4 space-y-2 text-sm text-gray-300">
                            {phase.milestones.map((milestone, i) => (
                                <li key={i} className="hover:text-white transition">{milestone}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Timeline (Vertical) */}
            <div className="md:hidden flex flex-col space-y-8 max-w-xl mx-auto relative">
                {/* Timeline Bar (z-index ensures it's behind the circles) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full bg-gray-700 z-0"></div>

                {roadmapData.map((phase, index) => (
                    <motion.div
                        key={index}
                        className="relative flex flex-col items-center text-center z-10"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* Vertical Line (Positioned Behind Circles) */}
                        {index !== 0 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-12 bg-gray-700 z-0"></div>
                        )}

                        {/* Quarter Badge (Centered) */}
                        <div className={`w-12 h-12 flex items-center justify-center text-xs font-bold rounded-full border-4 ${phase.color} text-black z-10`}>
                            {phase.quarter}
                        </div>

                        {/* Milestones */}
                        <ul className="mt-4 space-y-1 text-xs text-gray-300">
                            {phase.milestones.map((milestone, i) => (
                                <li key={i} className="hover:text-white transition">{milestone}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
