import React from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/types/token";

interface TokenListProps {
  tokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  const router = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
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
              Balance:{" "}
              {token.token_info.balance / 10 ** token.token_info.decimals}
            </span>
          </div>
          <button
            onClick={() => router.push(`/chat/${token.id}`)}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Chat
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TokenList;
