/**
 * File: /components/TokenList.tsx
 *
 * Description:
 * - Displays a list of the user’s fungible tokens with balances.
 * - Includes a button to join token-specific chat rooms.
 * - Styled as a responsive grid of cards for an app-like experience.
 */

import React from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/types/token";

interface TokenListProps {
  tokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  const router = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {tokens.map((token) => (
        <li
          key={token.id}
          className="chat-card flex items-center justify-between"
        >
          <div className="flex flex-col">
            <strong className="text-gray-900 font-semibold">
              {token.content.metadata.name} ({token.content.metadata.symbol})
            </strong>
            <span className="text-sm text-gray-600">
              Balance: {(token.token_info.balance / 10 ** token.token_info.decimals).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => router.push(`/chat/${token.id}`)}
            className="chat-button text-sm px-3 py-1"
          >
            Chat
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TokenList;