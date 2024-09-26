import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; 
import * as dotenv from 'dotenv'; 
import { AdminModule } from './api/admin/admin.module';
import { ClientModule } from './api/client/client.module'; 
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule);
  
  // Use cookie-parser
  app.use(cookieParser());

  // Set global prefix
  app.setGlobalPrefix('api');
  
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
  SwaggerModule.setup('api/admin', app, adminDocument); // Admin Swagger UI

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
 
  SwaggerModule.setup('api/client', app, clientDocument); // Client Swagger UI
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();

