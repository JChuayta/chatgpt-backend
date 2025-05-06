import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import admin from '../../../../shared/config/firebase/firebase';
import { ChatService } from '../../application/services/chat.service';
import { FirebaseUser } from '../../infraestructure/decorators/firebase-user.decorator';
import { FirebaseAuthGuard } from '../../infraestructure/guards/firebase-auth.guard';
import { ChatRepository } from '../../infraestructure/repositories/chat.repository';
import { CreateChatDto } from '../dtos/create-chat.dto';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(FirebaseAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatRepository: ChatRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Enviar mensaje a ChatGPT y obtener respuesta' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Hola, ¿cómo estás?' },
      },
      required: ['message'],
    },
  })
  @ApiResponse({ status: 200, description: 'Respuesta generada por ChatGPT' })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o no proporcionado',
  })
  async sendMessage(
    @Body() createChatDto: CreateChatDto,
    @FirebaseUser() user: admin.auth.DecodedIdToken,
  ) {
    try {
      const userMessage = await this.chatRepository.saveMessage({
        uid: user.uid,
        uidRef: null,
        message: createChatDto.message,
        type: 'user',
        displayName: user.email as string,
        createdAt: new Date(),
      });

      const response = await this.chatService.getChatGptResponse(
        createChatDto.message,
      );

      const botMessage = await this.chatRepository.saveMessage({
        uid: 'chatbot',
        uidRef: user.uid,
        message: response,
        type: 'bot',
        displayName: 'ChatGPT',
        createdAt: new Date(),
      });

      return { userMessage, botMessage };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
