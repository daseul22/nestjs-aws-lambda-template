import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);

  nestApp.useGlobalPipes(new ValidationPipe());

  return nestApp;
}

async function run() {
  const nestApp = await bootstrap();
  await nestApp.listen(3000);
}

if (!['production', 'staging'].includes(process.env.NODE_ENV)) {
  run();
}
