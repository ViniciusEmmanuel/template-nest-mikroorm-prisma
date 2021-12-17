import { UserLogin } from '@core/user/entities/user-login.entity';

export interface IUserLoginRepository {
  getByUserId(userId: number): Promise<UserLogin | null>;

  save(userLogin: UserLogin): Promise<void>;
}
