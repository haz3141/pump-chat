"use client";

import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserTokens } from "@/hooks/useUserTokens";
import ChatMessageList from "@/components/ChatMessageList";
import ChatInput from "@/components/ChatInput";
import ChatContractInfo from "@/components/ChatContractInfo";
import ChatHeader from "@/components/ChatHeader";
import ChatroomFooter from "@/components/ChatroomFooter";
import useChat from "@/hooks/useChat";
import { sendMessage } from "@/lib/chatUtils";
import useDeFiData from "@/hooks/useDeFiData";
import DeFiDataDisplay from "@/components/DeFiDataDisplay";
import StakingMockup from "@/components/StakingMockup";

interface Token {
  id: string;
  token_info: {
    balance: number;
    decimals: number;
  };
}

export default function ChatPage() {
  const { contractAddress } = useParams<{ contractAddress: string }>();
  const contractAddressString = contractAddress ?? "";

  const [newMessage, setNewMessage] = useState("");
  const messages = useChat(contractAddressString);
  const { publicKey } = useWallet();

  const network = "solana";
  const { data, loading: defiLoading, error: defiError } = useDeFiData(network, contractAddressString);
  const { tokens, loading: balanceLoading, error: balanceError } = useUserTokens();

  const getAvailableBalance = useCallback(() => {
    const token = tokens.find((t: Token) => t.id === contractAddressString);
    return token ? token.token_info.balance / 10 ** token.token_info.decimals : 0;
  }, [tokens, contractAddressString]);

  const availableBalance = getAvailableBalance();

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;
    if (!contractAddressString || !publicKey) {
      alert("You must connect your wallet to send messages.");
      return;
    }
    try {
      await sendMessage(contractAddressString, publicKey, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  }, [newMessage, contractAddressString, publicKey]);

  const isDisabled = !publicKey;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 h-16">
        <ChatHeader />
      </div>
      <div className="w-full h-[calc(100vh-102px)] mt-16 overflow-hidden">
        <div className="grid grid-cols-5 gap-6 px-6 h-full">
          <div className="col-span-4 bg-white rounded-lg shadow-md flex flex-col h-full overflow-hidden">
            <div className="flex-shrink-0 h-[104px]">
              <ChatContractInfo
                contractAddress={contractAddressString}
                name={data?.data?.attributes?.name}
                symbol={data?.data?.attributes?.symbol}
              />
            </div>
            <div className="flex-1 overflow-y-auto mt-4"> {/* Adjusted margin-top here */}
              <ChatMessageList messages={messages} publicKey={publicKey?.toBase58()} />
            </div>
            <div className="flex-shrink-0 h-[52px]">
              <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                sendMessage={handleSendMessage}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2 h-full">
            <div className="h-1/2 bg-white rounded-lg shadow-md">
              <DeFiDataDisplay data={data} loading={defiLoading} error={defiError} />
            </div>
            <div className="h-1/2 bg-white rounded-lg shadow-md">
              {balanceLoading ? (
                <div className="text-center text-gray-900 h-full flex items-center justify-center">
                  Loading balance...
                </div>
              ) : balanceError ? (
                <div className="text-center text-red-600 font-medium h-full flex items-center justify-center">
                  Error loading balance: {balanceError}
                </div>
              ) : (
                <StakingMockup
                  tokenSymbol={data?.data?.attributes?.symbol || "TOKEN"}
                  availableBalance={availableBalance}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 h-[38px]">
        <ChatroomFooter />
      </div>
    </div>
  );
}
