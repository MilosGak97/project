import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips out any properties that are not in the DTO
    forbidNonWhitelisted: true, // Throws an error if extra properties are provided
    transform: true, // Automatically transforms payloads to be objects typed according to their DTOs
  }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin Users API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
