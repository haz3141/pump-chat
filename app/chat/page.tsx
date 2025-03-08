/**
 * File: /app/chat/page.tsx
 * 
 * Description:
 * - Main chat page for Kulture.Fun.
 * - Allows users to connect their wallet and view their fungible tokens.
 * - Provides access to token-specific chat rooms with search and tabbed navigation.
 * - Displays Top Chats and Trending Tokens in a horizontal layout.
 */

"use client";

import { useState } from "react";
import { useUserTokens } from "@/hooks/useUserTokens";
import ChatHeader from "@/components/ChatHeader";
import TokenList from "@/components/TokenList";
import WalletPrompt from "@/components/WalletPrompt";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import NoTokensMessage from "@/components/NoTokensMessage";
import TopChats from "@/components/TopChats";
import TrendingTokens from "@/components/TrendingTokens";
import ChatFooter from "@/components/ChatFooter";

export default function ChatPage() {
  const { tokens, loading, error, isAuthenticated } = useUserTokens();
  const [activeTab, setActiveTab] = useState("my-tokens");

  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6 bg-gray-100 px-6 py-4 pt-[80px]">
      <ChatHeader />

      {/* Search Bar */}
      <div className="w-full max-w-5xl">
        <input
          type="text"
          placeholder="Search tokens or chats..."
          className="chat-input w-full mb-6"
        />
      </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "my-tokens" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => setActiveTab("my-tokens")}
        >
          My Tokens
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "trending" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => setActiveTab("trending")}
        >
          Trending
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "top-chats" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => setActiveTab("top-chats")}
        >
          Top Chats
        </button>
      </div>

      {/* Content */}
      {activeTab === "my-tokens" && (
        <>
          {!isAuthenticated && <WalletPrompt />}
          {loading && <LoadingMessage />}
          {error && <ErrorMessage message={error} />}
          {isAuthenticated && !loading && !error && tokens.length > 0 && (
            <div className="w-full max-w-5xl">
              <TokenList tokens={tokens} />
            </div>
          )}
          {isAuthenticated && !loading && !error && tokens.length === 0 && (
            <NoTokensMessage />
          )}
        </>
      )}
      {activeTab === "trending" && (
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 min-w-[45%]">
            <TrendingTokens />
          </div>
        </div>
      )}
      {activeTab === "top-chats" && (
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 min-w-[45%]">
            <TopChats />
          </div>
        </div>
      )}

      <ChatFooter />
    </main>
  );
}