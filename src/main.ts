import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
dotenv.config();
async function bootstrap() {
  console.log('process.env.port-------->', process.env.port);
  const PORT = process.env.port || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log('Application is running on port: ' + PORT);
}
bootstrap();
