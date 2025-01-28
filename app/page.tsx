// app/page.tsx (Home Page)

"use client";

import DynamicWalletButton from "@/components/DynamicWalletButton";
import { useRouter } from "next/navigation";
import { useUserTokens } from "@/hooks/useUserTokens";

export default function Home() {
  const { tokens, loading, error, isConnected } = useUserTokens();
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Pump-Chat [Alpha]</h1>

      <DynamicWalletButton />

      {!isConnected && (
        <p className="text-gray-600">Please connect your wallet to view your tokens.</p>
      )}

      {loading && <p className="text-gray-500">Loading tokens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display tokens */}
      {isConnected && !loading && !error && tokens.length > 0 && (
        <ul className="w-full max-w-lg space-y-4">
          {tokens.map((token) => (
            <li
              key={token.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex items-center justify-between"
            >
              <div>
                <strong className="block text-gray-800">
                  {token.content.metadata.name} ({token.content.metadata.symbol})
                </strong>
                <span className="text-gray-600">
                  Balance: {token.token_info.balance / 10 ** token.token_info.decimals}
                </span>
              </div>
              {/* Chat button */}
              <button
                onClick={() => router.push(`/chat/${token.id}`)}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Join Chat
              </button>
            </li>
          ))}
        </ul>
      )}

      {isConnected && !loading && !error && tokens.length === 0 && (
        <p className="text-gray-600">No tokens found in your wallet.</p>
      )}
    </main>
  );
}
