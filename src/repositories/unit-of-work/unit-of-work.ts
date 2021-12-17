import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, Scope } from '@nestjs/common';
import { IUserLoginRepository } from '@repositories/user/interfaces/user-login.repository.interface';
import { IUserRepository } from '@repositories/user/interfaces/user.repository.interface';
import { UserLoginRepository } from '@repositories/user/user-login.repository';
import { UserRepository } from '@repositories/user/user.repository';
import { IUnitOfWork } from './interfaces/unit-of-work.interfaces';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork implements IUnitOfWork {
  private readonly em: EntityManager;

  private get isTransactional() {
    return this.em.isInTransaction();
  }

  private instanceUserRepository: IUserRepository | null = null;

  private instanceUserLoginRepository: IUserLoginRepository | null = null;

  constructor(em: EntityManager) {
    this.em = em.fork(false);
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
    if (!this.isTransactional) return;

    try {
      await this.em.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async rollback() {
    if (!this.isTransactional) return;

    await this.em.rollback();
  }
}
