import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { Connection, Query, Sql } from './prisma-connect.interface';

@Injectable()
export class PrismaConnectService implements OnModuleInit {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient({ log: ['error', 'query'] });
  }

  async onModuleInit() {
    await this.prismaClient.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.prismaClient.$on('beforeExit', async () => {
      await app.close();
    });
  }

  get connection(): Connection {
    return this.prismaClient;
  }

  get query(): Query {
    return this.prismaClient;
  }

  toPrismaSql(q: string[], binds: unknown[] = []): Sql {
    if (binds.length > 0) return Prisma.sql(q, binds);
    return Prisma.sql(q);
  }
}
