import { PrismaClient, Prisma } from '@prisma/client';

export type Sql = Prisma.Sql;

export type Query = Pick<PrismaClient, Prisma.ModelName>;

export type Connection = Pick<
  PrismaClient,
  | Prisma.ModelName
  | '$queryRaw'
  | '$executeRaw'
  | '$transaction'
  | '$executeRawUnsafe'
>;
