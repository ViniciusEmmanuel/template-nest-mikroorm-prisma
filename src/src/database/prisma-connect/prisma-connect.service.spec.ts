import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConnectService } from './prisma-connect.service';

describe('PrismaConnectService', () => {
  let service: PrismaConnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaConnectService],
    }).compile();

    service = module.get<PrismaConnectService>(PrismaConnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
