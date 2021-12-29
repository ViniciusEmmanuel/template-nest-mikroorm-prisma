import { PrismaConnectService } from 'src/database/prisma-connect/prisma-connect.service';

export class EntityManager {
  constructor(private prismaClient: PrismaConnectService) {}

  get query() {
    return this.prismaClient.query;
  }

  async begin() {
    return Promise.resolve();
  }

  async commit() {
    return Promise.resolve();
  }

  async rollback() {
    return Promise.resolve();
  }

  toPrismaSql = this.prismaClient.toPrismaSql.bind(this.prismaClient);

  async queryRaw<T = unknown>(q: string, binds: unknown[] = []): Promise<T> {
    const query = this.toPrismaSql([q], binds);
    return this.prismaClient.connection.$queryRaw<T>(query);
  }

  async executeRaw(q: string, binds: unknown[] = []): Promise<number> {
    const query = this.toPrismaSql([q], binds || []);
    return this.prismaClient.connection.$executeRaw(query);
  }
}
