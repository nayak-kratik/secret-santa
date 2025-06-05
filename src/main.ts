import 'dotenv/config'; // This loads .env before anything else
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from './common/filters/typeorm-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (or specify origin: 'http://localhost:3000' for more security)
  app.enableCors({
    origin: ['http://localhost:3000', 'https://secret-santa-fe-823813087965.us-central1.run.app'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeOrmExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
