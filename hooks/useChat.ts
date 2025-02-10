/**
 * File: /hooks/useChat.ts
 * Description:
 * - Custom hook to manage chat messages and real-time updates.
 */

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/lib/firebaseConfig";
import { ChatMessage } from "@/types/chat";

const useChat = (contractAddress: string | undefined) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!contractAddress) return;

    const chatRef = ref(realtimeDB, `chats/${contractAddress}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allMessages: ChatMessage[] = Object.keys(data).map((key) => ({
          id: key,
          sender: data[key].sender,
          message: data[key].message,
          timestamp: data[key].timestamp,
        }));
        // Sort messages by timestamp (oldest first)
        allMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [contractAddress]);

  return messages;
};

export default useChat;
