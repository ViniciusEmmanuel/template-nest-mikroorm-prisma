import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserLoginSchema } from './user-login.schema';

@Entity({ tableName: 'users' })
export class UserSchema {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  phoneNumber!: string;

  @Property({ nullable: true })
  email!: string | null;

  @OneToMany(() => UserLoginSchema, (userLogin) => userLogin.user, {
    cascade: [Cascade.ALL],
    persist: false,
  })
  userLogins = new Collection<UserLoginSchema>(this);
}
