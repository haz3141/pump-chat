// components/CallToAction.tsx
"use client"; // Required for animations

import { motion } from "framer-motion";

export default function CallToAction() {
    return (
        <section id="about" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6">
            {/* CallToAction Heading */}
            <motion.h2
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Join the Future of Token-Based Chat
            </motion.h2>

            {/* CallToAction Subtext */}
            <motion.p
                className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Connect with your community like never before. Secure, decentralized, and built for you.
            </motion.p>

            {/* CallToAction Button */}
            <motion.a
                href="#"
                className="mt-6 inline-block px-8 py-4 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Get Started
            </motion.a>
        </section>
    );
}
