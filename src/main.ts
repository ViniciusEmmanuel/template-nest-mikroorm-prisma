import { ShutdownSignal, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import helmet from 'fastify-helmet';

import { UUID } from '@shared/UUID';

class Main {
  private readonly signals = [
    ShutdownSignal.SIGINT,
    ShutdownSignal.SIGTERM,
    ShutdownSignal.SIGQUIT,
  ];

  private readonly PORT = parseInt(process.env.PORT as string, 10);

  private async newRelic() {
    if (process.env.NODE_ENV !== 'local') {
      await import('newrelic');
    }
  }

  async bootstrap() {
    await this.newRelic();

    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true, genReqId: UUID.get }),
    );

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    await app.register(helmet);

    await app
      .useGlobalPipes(new ValidationPipe({ transform: true }))
      .enableShutdownHooks(this.signals)
      .listen(this.PORT);
  }
}

const main = new Main();

main.bootstrap();
