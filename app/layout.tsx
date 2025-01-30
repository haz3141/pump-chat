import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google"; // Import fonts

import { SolanaWalletProvider } from "./providers/solana-wallet-provider";
import "./globals.css";

/** 
 * Font Configuration:
 * - "Press Start 2P" → Used for headings (retro/Web3 aesthetic).
 * - "Inter" → Used for body text (modern & highly readable).
 */
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/**
 * Metadata Configuration:
 * - Optimized for SEO and OpenGraph previews.
 */
export const metadata: Metadata = {
  title: "Pump-Chat | Communeo",
  description: "Communeo is a platform for token holders to chat.",
  openGraph: {
    title: "Pump-Chat",
    description: "Join the decentralized chat revolution.",
    images: ["/og-image.png"], // TODO: Replace with actual OG image.
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${pressStart.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        {/* Global provider for Solana wallet interactions */}
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
