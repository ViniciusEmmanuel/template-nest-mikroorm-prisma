import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UnitOfWork } from './unit-of-work';

@Module({
  imports: [DatabaseModule],
  exports: [UnitOfWork],
  providers: [UnitOfWork],
})
export class RepositoriesModule {}
