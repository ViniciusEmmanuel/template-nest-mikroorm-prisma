import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import { env, validate } from './environment';

@Module({
  imports: [
    ConfigModuleNest.forRoot({ isGlobal: true, load: [env], validate }),
  ],
})
export class ConfigModule {}
