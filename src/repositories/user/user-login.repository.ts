import { BaseRepository } from '@repositories/base.repository';
import { IUserLoginRepository } from './interfaces/user-login.repository.interface';
import { UserLoginSchema } from './schemas/user-login.schema';
import { UserLogin } from '@core/user/entities/user-login.entity';
import { EntityManager } from '@repositories/unit-of-work/entity-manager';

export class UserLoginRepository
  extends BaseRepository<UserLogin, UserLoginSchema>
  implements IUserLoginRepository
{
  protected entityIdKeys = ['id'];

  constructor(private em: EntityManager) {
    super();
  }

  async getByUserId(userId: number): Promise<UserLogin | null> {
    const userLogin = await this.em.query.user_logins.findFirst({
      where: { userId },
    });
    if (!userLogin) return null;
    return this.mapperToEntity(UserLogin, userLogin);
  }

  async save(userLogin: UserLogin): Promise<void> {
    if (userLogin.id) {
    } else {
      const { id } = await this.em.query.user_logins.create({
        data: { ...userLogin } as UserLoginSchema,
      });
      userLogin.id = id;
    }
  }
}
