import { User } from '@core/user/entities/user.entity';

export interface IUserRepository {
  getById(id: number): Promise<User | null>;

  getByPhone(phoneNumber: string): Promise<User | null>;

  save(user: User): Promise<void>;
}
