/**
 * File: /types/firestore.ts
 * Description: Contains TypeScript interfaces for Firestore documents and chat messages.
 */

export interface FirestoreDocument {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: number;
}
