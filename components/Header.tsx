"use client";

import { useState, useEffect } from "react";

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
            setMenuOpen(false); // Close menu on mobile after clicking a link
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-3xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-6 text-white text-lg font-semibold">
                    <button onClick={() => scrollToSection("roadmap")} className="cursor-pointer hover:text-blue-400 transition">
                        Roadmap
                    </button>
                    <button onClick={() => scrollToSection("how-it-works")} className="cursor-pointer hover:text-blue-400 transition">
                        How It Works
                    </button>
                    <button onClick={() => scrollToSection("features")} className="cursor-pointer hover:text-blue-400 transition">
                        Features
                    </button>
                    <button onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-blue-400 transition">
                        About Us
                    </button>
                </nav>
            </div>

            {/* Mobile Navigation Dropdown */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/90 text-white py-4">
                    <button onClick={() => scrollToSection("roadmap")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                        Roadmap
                    </button>
                    <button onClick={() => scrollToSection("how-it-works")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                        How It Works
                    </button>
                    <button onClick={() => scrollToSection("features")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                        Features
                    </button>
                    <button onClick={() => scrollToSection("about")} className="block w-full text-lg py-2 hover:text-blue-400 transition">
                        About Us
                    </button>
                </div>
            )}
        </header>
    );
}
