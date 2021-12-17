import { EntityManager, SqlEntityRepository } from '@mikro-orm/mariadb';
import { BaseRepository } from '@repositories/base.repository';
import { IUserLoginRepository } from './interfaces/user-login.repository.interface';
import { UserLoginSchema } from './schemas/user-login.schema';
import { UserLogin } from '@core/user/entities/user-login.entity';

export class UserLoginRepository
  extends BaseRepository<UserLoginSchema>
  implements IUserLoginRepository
{
  protected repository: SqlEntityRepository<UserLoginSchema>;

  constructor(em: EntityManager) {
    super();

    this.repository = em.getRepository(UserLoginSchema);
  }

  async getByUserId(userId: number): Promise<UserLogin | null> {
    const userLogin = await this.repository.findOne({ userId });
    if (!userLogin) return null;
    return this.mapperToEntity(UserLogin, userLogin);
  }

  async save(userLogin: UserLogin): Promise<void> {
    if (userLogin.id) {
      const refUser = this.repository.getReference(userLogin.id);
      const userToUpdate = this.repository.assign(refUser, userLogin);
      this.repository.persist(userToUpdate);
    } else {
      const id = await this.repository.nativeInsert(userLogin);
      userLogin.id = id;
    }
  }
}
