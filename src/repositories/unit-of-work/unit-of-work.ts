import { PrismaConnectService } from '@database/prisma-connect/prisma-connect.service';
import { Injectable, Scope } from '@nestjs/common';
import { IUserLoginRepository } from '@repositories/user/interfaces/user-login.repository.interface';
import { IUserRepository } from '@repositories/user/interfaces/user.repository.interface';
import { UserLoginRepository } from '@repositories/user/user-login.repository';
import { UserRepository } from '@repositories/user/user.repository';
import { EntityManager } from './entity-manager';
import { IUnitOfWork } from './interfaces/unit-of-work.interfaces';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork implements IUnitOfWork {
  private em: EntityManager;
  private instanceUserRepository: IUserRepository | null = null;

  private instanceUserLoginRepository: IUserLoginRepository | null = null;

  constructor(prismaClient: PrismaConnectService) {
    this.em = new EntityManager(prismaClient);
  }

  get userRepository(): IUserRepository {
    if (!this.instanceUserRepository)
      this.instanceUserRepository = new UserRepository(this.em);

    return this.instanceUserRepository;
  }

  get userLoginRepository(): IUserLoginRepository {
    if (!this.instanceUserLoginRepository)
      this.instanceUserLoginRepository = new UserLoginRepository(this.em);

    return this.instanceUserLoginRepository;
  }

  async begin() {
    await this.em.begin();
  }

  async commit() {
    try {
      await this.em.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async rollback() {
    await this.em.rollback();
  }
}
