export interface ChatMessage {
    id: string; // Unique message ID
    sender: string; // User who sent the message (wallet address)
    message: string; // The chat message
    timestamp: number; // Timestamp for ordering
  }
  