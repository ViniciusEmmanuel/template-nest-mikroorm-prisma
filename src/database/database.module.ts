import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Scope } from '@nestjs/common';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      scope: Scope.REQUEST,
      ...mikroOrmConfig,
    }),
  ],
})
export class DatabaseModule {}
