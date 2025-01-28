// components/DynamicWalletButton.tsx

"use client";

import dynamic from "next/dynamic";

const DynamicWalletButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false } // Disable server-side rendering
);

export default DynamicWalletButton;
