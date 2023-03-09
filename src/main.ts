import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = app.get(ConfigService);

  if (config.get('cors')) {
    app.enableCors({
      origin: true,
      methods: 'GET, PUT, POST, DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
    });
  }

  await app.listen(config.get('port'));
}
bootstrap();
