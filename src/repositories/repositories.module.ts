import { Module } from '@nestjs/common';
import { UnitOfWork } from './unit-of-work';

@Module({
  exports: [UnitOfWork],
  providers: [UnitOfWork],
})
export class RepositoriesModule {}
