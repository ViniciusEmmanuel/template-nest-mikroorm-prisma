import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { RepositoriesModule } from '@repositories/repositories.module';
import { CreateUserController } from './user/create-user/create-user.controller';
import { UpdateUserController } from './user/update-user/update-user.controller';

@Module({
  imports: [RepositoriesModule, ProvidersModule],
  controllers: [CreateUserController, UpdateUserController],
})
export class ControllerModule {}
