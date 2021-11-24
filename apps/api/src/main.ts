/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// const API_BASE_URL = "https://all-star-quiz-api.herokuapp.com/"
const API_BASE_URL = 'http://localhost:3333'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets('../../quiz/pages/index.tsx');
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at ${API_BASE_URL} + '/' + globalPrefix`);
  });
}

bootstrap();
