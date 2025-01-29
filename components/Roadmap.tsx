"use client";

import { motion } from "framer-motion";

const steps = [
    { id: 1, text: "Community Growth & Token-Based Chatrooms", color: "text-purple-400", pathColor: "from-purple-400 to-pink-400" },
    { id: 2, text: "Launch of Pump.Chat’s Own Token", color: "text-blue-400", pathColor: "from-blue-400 to-cyan-400" },
    { id: 3, text: "AI Agents for Moderation & Conversation Recaps", color: "text-green-400", pathColor: "from-green-400 to-teal-400" },
    { id: 4, text: "Token-Based Features: Staking, Governance", color: "text-yellow-400", pathColor: "from-yellow-400 to-orange-400" },
    { id: 5, text: "Expansion to More Chains & Partnerships", color: "text-red-400", pathColor: "from-red-400 to-pink-400" },
];

export default function Roadmap() {
    return (
        <section id="roadmap" className="py-20 bg-black text-white text-center px-6">
            {/* Section Title */}
            <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Pump.Chat Roadmap
            </motion.h2>

            {/* Roadmap Container */}
            <div className="relative flex flex-col items-center space-y-12 max-w-4xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        className="flex flex-col items-center text-center w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* Number & Step Line */}
                        <div className="flex items-center w-full max-w-md">
                            {/* Number inside a Circle */}
                            <div className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full bg-gray-800 ${step.color}`}>
                                {step.id}
                            </div>

                            {/* Path Line (Responsive) */}
                            <div className={`flex-1 h-2 bg-gradient-to-r ${step.pathColor} mx-4 rounded-full hidden sm:block`}></div>
                        </div>

                        {/* Step Text */}
                        <p className="mt-4 text-lg font-semibold max-w-md">{step.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
