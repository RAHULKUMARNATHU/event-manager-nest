import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';

@Module({
  imports :[TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
