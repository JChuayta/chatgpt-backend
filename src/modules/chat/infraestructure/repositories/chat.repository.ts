import { Injectable } from '@nestjs/common';
import admin from '../../../../shared/config/firebase/firebase';

const db = admin.firestore();
export interface ChatMessage {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  createdAt: any;
}
interface ChatMessageData {
  text: string;
  uid: string;
  displayName: string;
  createdAt: Date;
}
@Injectable()
export class ChatRepository {
  private readonly collection = db.collection('messages');

  async saveMessage(data: {
    uid: string;
    message: string;
    type: 'user' | 'bot';
    displayName: string;
    createdAt?: Date;
    uidRef: string | null;
  }): Promise<ChatMessage> {
    const createdAt = data.createdAt ?? new Date();

    const docRef = await this.collection.add({
      text: data.message,
      uid: data.uid,
      type: data.type,
      displayName: data.displayName,
      uidRef: data.uidRef,
      createdAt,
    });

    return {
      id: docRef.id,
      text: data.message,
      uid: data.uid,
      displayName: data.displayName,
      createdAt,
    };
  }

  async getMessagesByUser(userId: string): Promise<ChatMessage[]> {
    const snapshot = await this.collection
      .where('uid', '==', userId)
      .orderBy('createdAt', 'asc')
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ChatMessageData;
      return {
        id: doc.id,
        text: data.text,
        uid: data.uid,
        displayName: data.displayName,
        createdAt: data.createdAt,
      } as ChatMessage;
    });
  }
}
