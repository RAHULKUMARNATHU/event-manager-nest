import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [EventModule , TypeOrmModule.forRoot({
    type:'postgres',
    host:'127.0.0.1',
    port:5432,
    username:'postgres',
    password:'Admin@123',
    database:'postgres'

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
