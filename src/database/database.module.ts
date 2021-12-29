import { Module } from '@nestjs/common';
import { PrismaConnectService } from './prisma-connect/prisma-connect.service';

@Module({
  imports: [],
  exports: [PrismaConnectService],
  providers: [PrismaConnectService],
})
export class DatabaseModule {}
