// components/Header.tsx
"use client";

import { useState, useEffect } from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

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
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all ${scrolled ? "bg-black/90 shadow-md backdrop-blur-md" : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <span
                    className="text-white text-2xl font-bold tracking-wide uppercase cursor-pointer"
                    onClick={() => scrollToSection("hero")}
                >
                    PUMP.CHAT
                </span>

                {/* Navigation Links */}
                <nav className="space-x-6 text-white text-lg font-semibold">
                    <button
                        onClick={() => scrollToSection("roadmap")}
                        className="cursor-pointer hover:text-blue-400 transition"
                    >
                        Roadmap
                    </button>
                    <button
                        onClick={() => scrollToSection("how-it-works")}
                        className="cursor-pointer hover:text-blue-400 transition"
                    >
                        How It Works
                    </button>
                    <button
                        onClick={() => scrollToSection("features")}
                        className="cursor-pointer hover:text-blue-400 transition"
                    >
                        Features
                    </button>
                    <button
                        onClick={() => scrollToSection("about")}
                        className="cursor-pointer hover:text-blue-400 transition"
                    >
                        About Us
                    </button>
                </nav>
            </div>
        </header>
    );
}
