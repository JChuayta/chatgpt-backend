export interface ChatMessage {
  id: string;
  message: string;
  uid: string;
  displayName: string;
  createdAt: Date;
  type: 'user' | 'bot';
  uidRef: string | null;
}
