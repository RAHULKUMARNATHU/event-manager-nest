import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}

  private getEventBaseQuery() {
    return this.repository.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public async getEvent(id: number): Promise<EventEntity | undefined> {
    const query = this.getEventBaseQuery().andWhere('e.id=:id', { id });
    this.logger.debug(query.getSql());

    return await query.getOne();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
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
    return await this.repository.findOne({ where: { id } });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
