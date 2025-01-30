/**
 * File: /app/chat/page.tsx
 *
 * Description:
 * - This is the main chat page for Pump.Chat.
 * - Allows users to connect their wallet and view their tokens.
 * - Provides access to chat rooms for different tokens.
 */

"use client";

import DynamicWalletButton from "@/components/DynamicWalletButton";
import { useRouter } from "next/navigation";
import { useUserTokens } from "@/hooks/useUserTokens";

export default function ChatPage() {
    const { tokens, loading, error, isConnected } = useUserTokens();
    const router = useRouter();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800">Pump-Chat [Alpha]</h1>

            {/* Wallet Connection Button */}
            <DynamicWalletButton />

            {/* Prompt User to Connect Wallet */}
            {!isConnected && (
                <p className="text-gray-600">Please connect your wallet to view your tokens.</p>
            )}

            {/* Loading State */}
            {loading && <p className="text-gray-500">Loading tokens...</p>}

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display Token List & Join Chat Buttons */}
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

                            {/* Join Chat Button */}
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

            {/* No Tokens Found */}
            {isConnected && !loading && !error && tokens.length === 0 && (
                <p className="text-gray-600">No tokens found in your wallet.</p>
            )}
        </main>
    );
}
