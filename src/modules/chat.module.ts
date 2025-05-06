import { Module } from '@nestjs/common';
import { ChatService } from './chat/application/services/chat.service';
import { ChatRepository } from './chat/infraestructure/repositories/chat.repository';
import { ChatController } from './chat/presentation/controllers/chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatModule {}
