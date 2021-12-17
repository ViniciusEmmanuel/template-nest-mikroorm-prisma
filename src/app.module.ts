import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ControllerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
