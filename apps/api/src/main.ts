/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// import * as cors from 'cors';
// import 'reflect-metadata';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets('../../quiz/pages/index.tsx');
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 'https://all-star-quiz-api.herokuapp.com/' || 3333;
  await app.listen(port, () => {
    Logger.log(
      'Listening at https://all-star-quiz-api.herokuapp.com/' +
        port +
        '/' +
        globalPrefix
    );
  });
}

bootstrap();
