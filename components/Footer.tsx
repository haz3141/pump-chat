// components/Footer.tsx
"use client"; // Required for animations

import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"; // ✅ Telegram Icon

export default function Footer() {
    return (
        <footer className="py-8 bg-gray-900 text-gray-400 text-center px-6">
            <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo or Brand Name */}
                <h2 className="text-xl font-semibold text-white">Pump Chat</h2>

                {/* Social Media Icons */}
                <div className="flex space-x-6">
                    {/* X (Twitter) Icon as an SVG */}
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <svg
                            className="w-6 h-6 fill-current text-gray-400 hover:text-white"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M23.64 4.56c-.82.36-1.7.6-2.6.72.94-.56 1.66-1.44 2-2.48-.88.52-1.86.9-2.9 1.1A4.66 4.66 0 0016.4 2c-2.58 0-4.68 2.1-4.68 4.68 0 .36.04.72.12 1.06C7.74 7.5 4.1 5.5 1.64 2.4a4.69 4.69 0 00-.64 2.36c0 1.64.82 3.1 2.08 3.94-.76-.02-1.48-.24-2.1-.6v.06c0 2.3 1.62 4.24 3.76 4.68a4.76 4.76 0 01-2.08.08c.6 1.86 2.34 3.22 4.4 3.26a9.34 9.34 0 01-5.78 2c-.38 0-.76 0-1.14-.06a13.2 13.2 0 007.16 2.1c8.62 0 13.34-7.14 13.34-13.34v-.6c.92-.64 1.68-1.44 2.3-2.36z" />
                        </svg>
                    </a>

                    {/* Telegram Icon */}
                    <a
                        href="https://t.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </a>
                </div>

                {/* Copyright Notice */}
                <p className="text-sm">&copy; {new Date().getFullYear()} Pump Chat. All rights reserved.</p>
            </motion.div>
        </footer>
    );
}
