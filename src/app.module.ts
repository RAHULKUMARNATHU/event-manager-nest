import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEntity } from './modules/event/entities/event.entity';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [EventModule , TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'Admin@123',
    database:'postgres',
    entities:[EventEntity],
    synchronize:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
