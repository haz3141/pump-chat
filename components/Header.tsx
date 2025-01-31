/**
 * File: /components/Header.tsx
 *
 * 🏆 Premium Floating Header:
 * - Glassmorphism styling for a high-end aesthetic.
 * - Shrinks on scroll for a dynamic, refined look.
 * - Uses Framer Motion for smooth mobile menu animations.
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button"; // Import the reusable button component

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to handle smooth scrolling
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            setMenuOpen(false); // Close mobile menu after clicking a link
        }
    };

    return (
        <motion.header
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl px-6 py-${scrolled ? "3" : "4"} z-50 rounded-2xl transition-all ${
                scrolled ? "bg-black/50 backdrop-blur-2xl shadow-md" : "bg-transparent backdrop-blur-none"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center">
                {/* 🔹 Logo */}
                <span
                    className="text-white text-2xl font-bold tracking-wide uppercase cursor-pointer"
                    onClick={() => scrollToSection("hero")}
                >
                    PUMP.CHAT
                </span>

                {/* 🔹 Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-3xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {/* 🔹 Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-6 text-white text-lg font-medium">
                    <button onClick={() => scrollToSection("roadmap")} className="cursor-pointer hover:text-blue-400 transition">
                        Roadmap
                    </button>
                    <button onClick={() => scrollToSection("how-it-works")} className="cursor-pointer hover:text-blue-400 transition">
                        How It Works
                    </button>
                    <button onClick={() => scrollToSection("features")} className="cursor-pointer hover:text-blue-400 transition">
                        Features
                    </button>

                    {/* 🔹 Premium Button with Classy Gradient */}
                    <Button
                        href="/chat"
                        variant="custom"
                        size="md"
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg hover:scale-105 transition-transform"
                    >
                        Open Chat
                    </Button>
                </nav>
            </div>

            {/* 🔹 Mobile Navigation Dropdown (Smooth Animations) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden absolute top-full left-0 w-full bg-black/90 text-white py-4 rounded-b-2xl shadow-lg"
                    >
                        <button onClick={() => scrollToSection("roadmap")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                            Roadmap
                        </button>
                        <button onClick={() => scrollToSection("how-it-works")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                            How It Works
                        </button>
                        <button onClick={() => scrollToSection("features")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                            Features
                        </button>

                        {/* 🔹 Mobile Button: Centered & Classy */}
                        <div className="flex justify-center mt-4">
                            <Button
                                href="/chat"
                                variant="custom"
                                size="lg"
                                className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg hover:scale-105 transition-transform"
                            >
                                Open Chat
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
