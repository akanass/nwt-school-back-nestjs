import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { PEOPLE } from '../data/people';
import { Person } from './people.types';

@Controller('people')
export class PeopleController {
  /**
   * Handler to answer to /people route
   *
   * @returns Observable<Person[]>
   */
  @Get()
  findAll(): Observable<Person[]> {
    return of(PEOPLE);
  }
}
