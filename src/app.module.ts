import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
