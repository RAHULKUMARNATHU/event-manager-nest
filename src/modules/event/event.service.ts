import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AttendeeAnswerEnum } from './entities/attendee.entity';
import { EventEntity } from './entities/event.entity';
import { ListEvents, WhenEventFilter } from './dto/list.event';

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

  public getEventsWithAttendeeCountQuery() {
    return this.getEventBaseQuery()
      .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Accepted,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Maybe,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeRejected',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Rejected,
          }),
      );
  }

  //  public async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
  //   let query = this.getEventsWithAttendeeCountQuery();

  //   if (!filter) {
  //     return query.getMany();
  //   }

  //   //FILTER FOR TODAY
  //   if (filter.when) {
  //     if (filter.when == WhenEventFilter.Today) {
  //       query = query.andWhere(
  //         `e.when >= CURDATE() AND e.when <= CURDATE () + INTERVAL 1 DAY `,
  //       );
  //     }
  //   }

  //   // FILTER FOR TOMORROW
  //   if (filter.when) {
  //     if (filter.when == WhenEventFilter.Tomorrow) {
  //       query = query.andWhere(
  //         `e.when >= CURDATE()+ INTERVAL 1 DAY AND e.when <= CURDATE () + INTERVAL 2 DAY `,
  //       );
  //     }
  //   }

  //   //  FILTER FOR THIS WEEK
  //   if (filter.when) {
  //     if (filter.when == WhenEventFilter.ThisWeek) {
  //       query = query.andWhere('YEARWEEK(e.when,1) = YEARWEEK(CURDATE(),1)');
  //     }
  //   }

  //   //FILTER FOR NEXT WEEK
  //   if (filter.when) {
  //     if (filter.when == WhenEventFilter.NextWeek) {
  //       query = query.andWhere(
  //         'YEARWEEK(e.when,1) = YEARWEEK(CURDATE(),1) + 1 ',
  //       );
  //     }
  //   }

  //   return await query.getMany;
  // }

  public async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
    let query = this.getEventsWithAttendeeCountQuery();

    if (!filter) {
      return query.getMany();
    }

    if (filter.when) {
      if (filter.when == WhenEventFilter.Today) {
        query = query.andWhere(
          `e.when >= CURDATE() AND e.when <= CURDATE() + INTERVAL 1 DAY`,
        );
      }

      if (filter.when == WhenEventFilter.Tomorrow) {
        query = query.andWhere(
          `e.when >= CURDATE() + INTERVAL 1 DAY AND e.when <= CURDATE() + INTERVAL 2 DAY`,
        );
      }

      if (filter.when == WhenEventFilter.ThisWeek) {
        query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1)');
      }

      if (filter.when == WhenEventFilter.NextWeek) {
        query = query.andWhere(
          'YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1) + 1',
        );
      }
    }

    return await query.getMany();
  }


  public async getEvent(id: number): Promise<EventEntity | undefined> {
    const query = this.getEventsWithAttendeeCountQuery().andWhere('e.id=:id', {
      id,
    });
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
