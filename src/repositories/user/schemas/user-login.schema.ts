import { user_logins } from '@prisma/client';

import { UserSchema } from './user.schema';
export interface UserLoginSchema extends user_logins {
  user?: UserSchema;
}
