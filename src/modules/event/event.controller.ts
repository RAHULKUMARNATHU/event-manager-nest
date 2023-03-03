import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { EventEntity } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './entities/attendee.entity';
@ApiTags('event-controllers')
@Controller('event')
export class EventController {
  private readonly logger = new Logger(EventController.name);

  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
    @InjectRepository(EventEntity)
    private readonly attendeeRepository: Repository<Attendee>,

    private readonly eventService: EventService,
  ) {}

  private events: EventEntity[] = [];

  @Post()
  async createEvent(@Body() input: CreateEventDto) {
    // const event = {
    //   ...input,
    //   when: new Date(input.when),
    //   id: this.events.length + 1,
    // };
    // this.events.push(event);
    // return event;

    return await this.eventService.createEvent(input);
  }

  @Get()
  async findAllEvents() {
    // return this.events;
    this.logger.log(`Hit the findAll route`);
    const events = await this.eventService.findAllEvents();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  // @Get(':id')
  // async findOne(@Param('id' , parseInt) id: number) {
  //   // const event = this.events.find((event) => event.id === parseInt(id));
  //   const event = await this.eventService.getEvent(id);
  //   return event;
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.eventService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === parseInt(id));
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    // return this.eventService.update(+id, updateEventDto);
    return this.events[index];
  }

  @Get('practice2')
  async practice2() {
    const event = await this.repository.findOne({
      where: { id: 1 },
      // loadEagerRelations:false
      relations: ['attendees'],
    });
  }

  @Get('practice')
  async practice() {
    const event = await this.repository.findOne({ where: { id: 1 } });
    // const event = new EventEntity();
    // event.id = 1;

    const attendee = new Attendee();
    attendee.name = 'Jerry';
    // attendee.event = event;

    event.attendees.push(attendee);
    event.attendees = [];
    // await this.attendeeRepository.save(attendee);
    await this.attendeeRepository.save(event);
    return event;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.eventService.remove(+id);
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
