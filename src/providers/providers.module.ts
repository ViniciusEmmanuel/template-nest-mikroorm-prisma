import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Module({
  exports: [LoggerService],
  providers: [LoggerService],
})
export class ProvidersModule {}
