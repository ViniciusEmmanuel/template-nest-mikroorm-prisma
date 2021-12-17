import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserSchema } from './user.schema';

@Entity({ tableName: 'user_logins' })
export class UserLoginSchema {
  @PrimaryKey()
  id!: number;

  @Property()
  userId!: number;

  @Property()
  device!: string;

  @Property()
  location!: string | null;

  @ManyToOne(() => UserSchema, { persist: false, mapToPk: true })
  user?: UserSchema;
}
