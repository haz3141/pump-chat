/**
 * File: /types/chat.ts
 * Description: Defines the TypeScript interface for chat messages.
 */

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
}
