/**
 * File: /app/layout.tsx
 * Description: Root layout for Pump.Chat. Sets up global styles, fonts,
 * metadata, and wraps the app with SolanaWalletProvider for wallet interactions.
 */

import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import { SolanaWalletProvider } from "./providers/solana-wallet-provider";
import "./globals.css";

// Google Fonts configuration:
// - "Press Start 2P" for headings (retro aesthetic)
// - "Inter" for body text (modern and readable)
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Metadata for SEO and social sharing:
export const metadata: Metadata = {
  title: "Pump-Chat | Communeo",
  description: "Communeo is a platform for token holders to chat.",
  openGraph: {
    title: "Pump-Chat",
    description: "Join the decentralized chat revolution.",
    images: ["/og-image.png"], // TODO: Replace with actual OG image.
  },
};

// Root layout component wrapping all pages with global settings:
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${pressStart.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
