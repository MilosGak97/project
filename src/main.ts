import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; 
import * as dotenv from 'dotenv'; 
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { Admin } from 'typeorm';

async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger setup for Admin API
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin Application API')
    .setVersion('1.0')
    .build(); 

    const optionAdmin:SwaggerDocumentOptions = {
      include: [AdminModule],
      deepScanRoutes: true
    }

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, optionAdmin); // No include option here
  SwaggerModule.setup('admin/api', app, adminDocument); // Admin Swagger UI

  // Swagger setup for Client API
  const clientConfig = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('Client Application API')
    .setVersion('1.0')
    .build();

    const optionClient:SwaggerDocumentOptions = {
      include: [ClientModule],
      deepScanRoutes: true
    }

    const clientDocument = SwaggerModule.createDocument(app, clientConfig, optionClient);
 
  SwaggerModule.setup('client/api', app, clientDocument); // Client Swagger UI

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();

