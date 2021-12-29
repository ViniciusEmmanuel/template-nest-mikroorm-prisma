import { users } from '@prisma/client';

export interface UserSchema extends users {
  userLogins?: [];
}
