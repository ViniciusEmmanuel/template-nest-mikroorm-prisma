import * as equal from 'fast-deep-equal/es6';
type EntityClass = Pick<typeof Object, 'prototype'>;

export abstract class BaseRepository<
  Entity extends object,
  Schema extends object,
> {
  abstract save(entityDate: Entity): Promise<void>;

  protected abstract entityIdKeys: string[];

  private entityMap = new Map<string, Schema>();

  private getEntityMap(entity: Entity | Schema) {
    const entityId = this.getEntityId(entity);
    return this.entityMap.get(entityId);
  }

  private setEntityMap(entity: Schema) {
    const entityId = this.getEntityId(entity);
    this.entityMap.set(entityId, entity);
  }

  private getEntityId(entity: Entity | Schema) {
    return this.entityIdKeys
      .map((key) => {
        return Reflect.get(entity, key);
      })
      .join(':');
  }

  protected propertyToUpdate(entity: Entity): Partial<Schema> | null {
    const entityCached = this.getEntityMap(entity);

    if (entityCached) {
      return Reflect.ownKeys(entity).reduce((acc: null | Schema, key) => {
        const accumulator = acc || Object.create({});
        const valueEntity = Reflect.get(entity, key);
        const valueEntityCache = Reflect.get(entityCached, key);

        if (!equal(valueEntity, valueEntityCache))
          Object.assign(accumulator, { [key]: valueEntity });

        return accumulator;
      }, null);
    }

    return entity;
  }

  protected mapperToEntity(entityClass: EntityClass, data: Schema) {
    this.setEntityMap(data);

    return Object.assign(Object.create(entityClass.prototype), data);
  }
}
