import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FirebaseAuthGuard } from './core/modules/auth/guard/firebase-auth.guard';
import { ChatModule } from './modules/chat/chat.module';
// import { FirebaseAuthGuard } from './chat/firebase-auth/firebase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  // app.useGlobalGuards(new FirebaseAuthGuard());
  app.useGlobalGuards(new FirebaseAuthGuard());
  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('API para enviar mensajes a ChatGPT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
