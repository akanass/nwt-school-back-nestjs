import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Person } from './people.types';
import { PeopleService } from './people.service';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

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

  /**
   * Handler to answer to /people/random route
   *
   * @returns Observable<Person | void>
   */
  @Get('random')
  findRandom(): Observable<Person | void> {
    return this._peopleService.findRandom();
  }

  /**
   * Handler to answer to /people/:id route
   *
   * @returns Observable<Person>
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Person> {
    return this._peopleService.findOne(id);
  }

  /**
   * Handler to answer to /people route
   *
   * @param createPersonDto
   *
   * @returns Observable<Person>
   */
  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Observable<Person> {
    return this._peopleService.create(createPersonDto);
  }

  /**
   * Handler to answer to /people route
   *
   * @param id
   * @param updatePersonDto
   *
   * @returns Observable<Person>
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Observable<Person> {
    return this._peopleService.update(id, updatePersonDto);
  }

  /**
   * Handler to answer to DELETE /people/:id route
   *
   * @param {string} id of the person to delete
   *
   * @returns Observable<void>
   */
  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._peopleService.delete(id);
  }
}
