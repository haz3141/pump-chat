"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useUserTokens } from "@/hooks/useUserTokens";

export default function Home() {
  const { tokens, loading, error, isConnected } = useUserTokens();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <h1>Solana Pump Chat</h1>

      <WalletMultiButton />

      {/* Show message when wallet is not connected */}
      {!isConnected && <p>Please connect your wallet to view your tokens.</p>}

      {/* Loading state */}
      {loading && <p>Loading tokens...</p>}

      {/* Error state */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display tokens if wallet is connected and tokens are found */}
      {isConnected && !loading && !error && tokens.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tokens.map((token) => (
            <li key={token.id} style={{ marginBottom: "1rem" }}>
              <strong>{token.content.metadata.name} ({token.content.metadata.symbol})</strong><br />
              Balance: {token.token_info.balance / 10 ** token.token_info.decimals}
            </li>
          ))}
        </ul>
      )}

      {/* If wallet is connected but no tokens found */}
      {isConnected && !loading && !error && tokens.length === 0 && (
        <p>No tokens found in your wallet.</p>
      )}
    </main>
  );
}
