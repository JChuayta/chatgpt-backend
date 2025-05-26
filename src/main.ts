import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WithoutFirebaseModule } from './modules/without-firebase/without-firebase.module';

async function bootstrap() {
  const app = await NestFactory.create(WithoutFirebaseModule);
  // app.useGlobalGuards(new FirebaseAuthGuard());
  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('API para enviar mensajes a ChatGPT')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://chatgpt-front-tau.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
