import { Module } from '@nestjs/common';
// import { ChatService } from '../chat/application/services/chat.service';
import { ChatService } from '../chat/application/services/chat.service';
import { WithoutFirebaseController } from './without-firebase.controller';

@Module({
  controllers: [WithoutFirebaseController],
  providers: [ChatService],
})
export class WithoutFirebaseModule {}
