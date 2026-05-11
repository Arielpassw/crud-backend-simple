import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Puerto dinámico para Render
  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Servidor corriendo en puerto ${port}`);
}

bootstrap();