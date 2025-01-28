// types/firestore.ts

// Type for documents in the `testCollection`
export interface FirestoreDocument {
    id: string; // Document ID
    name: string; // Name field
    email: string; // Email field
    message: string; // Message field
  }
  
  // Type for chat messages in token-specific chats
  export interface ChatMessage {
    id: string; // Message ID
    message: string; // Chat message text
    timestamp: number; // Timestamp for message ordering
  }
  