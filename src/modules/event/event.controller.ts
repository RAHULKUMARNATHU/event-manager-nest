import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { EventEntity } from './entities/event.entity';

@ApiTags('event-controllers')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  private events: EventEntity[] = [];

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);
    return event;

    // return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.events;
    // return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const event = this.events.find((event) => event.id === parseInt(id));
    // return this.eventService.findOne(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.eventService.remove(+id);
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
