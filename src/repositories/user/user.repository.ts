import { IUserRepository } from './interfaces/user.repository.interface';
import { BaseRepository } from '@repositories/base.repository';
import { UserSchema } from './schemas/user.schema';
import { User } from '@core/user/entities/user.entity';
import { EntityManager } from '@repositories/unit-of-work/entity-manager';

export class UserRepository
  extends BaseRepository<User, UserSchema>
  implements IUserRepository
{
  protected entityIdKeys = ['id'];

  constructor(private em: EntityManager) {
    super();
  }

  async getById(id: number): Promise<User | null> {
    const user = await this.em.query.users.findUnique({ where: { id } });
    if (!user) return null;

    return this.mapperToEntity(User, user);
  }

  async getByPhone(phoneNumber: string): Promise<User | null> {
    const user = await this.em.query.users.findFirst({
      where: { phoneNumber },
    });
    if (!user) return null;

    return this.mapperToEntity(User, user);
  }

  async save(user: User): Promise<void> {
    if (user.id) {
      const propertyToUpdate = this.propertyToUpdate(user);
      if (propertyToUpdate) {
        await this.em.query.users.update({
          data: propertyToUpdate,
          where: { id: user.id },
        });
      }
    } else {
      const { id } = await this.em.query.users.create({
        data: { ...user } as UserSchema,
      });
      user.id = id;
    }
  }
}
