// // src/modules/chat/repositories/chat.repository.ts
// import { Injectable } from '@nestjs/common';
// import admin from '../../../shared/config/firebase/firebase';
// import { ChatMessage } from '../entities/chat-message.entity';

// const db = admin.firestore();

// @Injectable()
// export class ChatRepository {
//   private readonly collection = db.collection('messages');

//   async saveMessage(
//     messageData: Omit<ChatMessage, 'id'>,
//   ): Promise<ChatMessage> {
//     const createdAt = data.createdAt ?? new Date();

//     const docRef = await this.collection.add({
//       ...messageData,
//       createdAt,
//     });

//     return {
//       id: docRef.id,
//       ...messageData,
//       createdAt,
//     };
//   }

//   async getMessagesByUser(userId: string): Promise<ChatMessage[]> {
//     const snapshot = await this.collection
//       .where('uid', '==', userId)
//       .orderBy('createdAt', 'asc')
//       .get();

//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as Omit<ChatMessage, 'id'>),
//     }));
//   }
// }
