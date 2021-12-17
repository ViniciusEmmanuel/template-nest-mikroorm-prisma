import { EntityRepository } from '@mikro-orm/mariadb';

type EntityClass = Pick<typeof Object, 'prototype'>;

export abstract class BaseRepository<Schema> {
  protected abstract repository: EntityRepository<Schema>;
  abstract save(entityDate: unknown): Promise<void>;

  protected mapperToEntity(entityClass: EntityClass, data: Schema) {
    return Object.assign(Object.create(entityClass.prototype), data);
  }
}
