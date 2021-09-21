import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Person } from './people.types';
import { PeopleService } from './people.service';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@Controller('people')
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  /**
   * Class constructor
   * @param _peopleService
   */
  constructor(private readonly _peopleService: PeopleService) {}

  /**
   * Handler to answer to /people route
   *
   * @returns Observable<Person[] | void>
   */
  @Get()
  findAll(): Observable<Person[] | void> {
    return this._peopleService.findAll();
  }
}
