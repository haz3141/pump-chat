/**
 * File: /app/layout.tsx
 * 
 * Description:
 * - Root layout for Kulture.Fun, setting up global styles, fonts, and metadata.
 * - Wraps the app with SolanaWalletProvider for wallet interactions.
 */

import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import { SolanaWalletProvider } from "./providers/solana-wallet-provider";
import "./globals.css";

// Google Fonts configuration:
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Metadata for SEO and OpenGraph previews
export const metadata: Metadata = {
  title: "Kulture.Fun | Token-Based Chat Revolution",
  description: "Kulture.Fun is a platform where token holders chat securely and decentralized.",
  metadataBase: new URL("https://kulture.fun"),
  openGraph: {
    title: "Kulture.Fun",
    description: "Join the future of token-based community chat.",
    images: ["/og-image.png"],
    url: "https://kulture.fun",
  },
};

// Root layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${pressStart.variable} ${inter.variable} antialiased bg-black text-white`}>
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
