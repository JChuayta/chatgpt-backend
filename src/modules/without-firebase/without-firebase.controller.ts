import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from 'src/modules/chat/application/services/chat.service';
import { CreateChatDto } from 'src/modules/chat/presentation/dtos/create-chat.dto';

@Controller('without-firebase')
export class WithoutFirebaseController {
  constructor(private readonly chatService: ChatService) {}

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
  async sendMessage(@Body() createChatDto: CreateChatDto) {
    try {
      const response = await this.chatService.getChatGptResponse(
        createChatDto.message,
      );

      return { response };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      // Puedes lanzar un error genérico o el error original
      throw error; // O bien: throw new InternalServerErrorException('Error procesando la solicitud');
    }
  }
}
