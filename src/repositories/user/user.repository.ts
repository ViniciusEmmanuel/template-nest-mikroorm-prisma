import { EntityManager, EntityRepository } from '@mikro-orm/mariadb';
import { IUserRepository } from './interfaces/user.repository.interface';
import { BaseRepository } from '@repositories/base.repository';
import { UserSchema } from './schemas/user.schema';
import { User } from '@core/user/entities/user.entity';

export class UserRepository
  extends BaseRepository<UserSchema>
  implements IUserRepository
{
  protected repository: EntityRepository<UserSchema>;
  constructor(em: EntityManager) {
    super();
    this.repository = em.getRepository(UserSchema);
  }

  async getById(id: number): Promise<User | null> {
    const user = await this.repository.findOne({ id });
    if (!user) return null;

    return this.mapperToEntity(User, user);
  }

  async getByPhone(phoneNumber: string): Promise<User | null> {
    const user = await this.repository.findOne({ phoneNumber });
    if (!user) return null;

    return this.mapperToEntity(User, user);
  }

  async save(user: User): Promise<void> {
    if (user.id) {
      const refUser = this.repository.getReference(user.id);
      const userToUpdate = this.repository.assign(refUser, { ...user });
      this.repository.persist(userToUpdate);
    } else {
      const id = await this.repository.nativeInsert({ ...user });
      user.id = id;
    }
  }
}
