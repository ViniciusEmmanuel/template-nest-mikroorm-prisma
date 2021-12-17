import { IUserLoginRepository } from '@repositories/user/interfaces/user-login.repository.interface';
import { IUserRepository } from '@repositories/user/interfaces/user.repository.interface';

export interface IUnitOfWork {
  get userLoginRepository(): IUserLoginRepository;

  get userRepository(): IUserRepository;

  begin(): Promise<void>;

  commit(): Promise<void>;

  rollback(): Promise<void>;
}
