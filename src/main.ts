import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common'; // Import Logger 
import * as dotenv from 'dotenv'; // Import dotenv
import { HttpExceptionFilter } from './http-exception.filter';


async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // Register the filter globally
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Override logger to get more detailed logs
  Logger.overrideLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin Users API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);

}

bootstrap();
