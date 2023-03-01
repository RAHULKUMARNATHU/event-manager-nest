import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}
  async createEvent(createEventDto: CreateEventDto) {
    return await this.repository.save(createEventDto);
  }

  async findAllEvents() {
    const events = await this.repository.find();
    if (!events) {
      throw new NotFoundException();
    }
    return events;
  }

  async findOne(id: number) {
    return await this.repository.findOne(
      { where: { id } }
    );
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
