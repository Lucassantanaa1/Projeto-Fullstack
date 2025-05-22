import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ✅ Importar ValidationPipe
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ativar validações dos DTOs
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Habilitar CORS (necessário para conexão com frontend)
  app.enableCors();

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API para gerenciamento de tarefas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Iniciar aplicação na porta 3001
  await app.listen(3001);
}
bootstrap();
