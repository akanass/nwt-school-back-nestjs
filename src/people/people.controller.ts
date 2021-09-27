import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { Observable } from 'rxjs';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { HandlerParams } from './validators/handler-params';
import { PersonEntity } from './entities/person.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@ApiTags('people')
@Controller('people')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  /**
   * Class constructor
   * @param _peopleService
   */
  constructor(private readonly _peopleService: PeopleService) {}

  /**
   * Handler to answer to GET /people route
   *
   * @returns Observable<PersonEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of person',
    type: PersonEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No person exists in database' })
  @Get()
  findAll(): Observable<PersonEntity[] | void> {
    return this._peopleService.findAll();
  }

  /**
   * Handler to answer to GET /people/random route
   *
   * @returns Observable<PersonEntity | void>
   */
  @ApiOkResponse({
    description: 'Returns one person randomly',
    type: PersonEntity,
  })
  @ApiNoContentResponse({ description: 'No person exists in database' })
  @Get('random')
  findRandom(): Observable<PersonEntity | void> {
    return this._peopleService.findRandom();
  }

  /**
   * Handler to answer to GET /people/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<PersonEntity>
   */
  @ApiOkResponse({
    description: 'Returns the person for the given "id"',
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    description: 'Person with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<PersonEntity> {
    return this._peopleService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /people route
   *
   * @param createPersonDto data to create
   *
   * @returns Observable<PersonEntity>
   */
  @ApiCreatedResponse({
    description: 'The person has been successfully created',
    type: PersonEntity,
  })
  @ApiConflictResponse({
    description: 'The person already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiBody({
    description: 'Payload to create a new person',
    type: CreatePersonDto,
  })
  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Observable<PersonEntity> {
    return this._peopleService.create(createPersonDto);
  }

  /**
   * Handler to answer to PUT /people/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   * @param updatePersonDto data to update
   *
   * @returns Observable<PersonEntity>
   */
  @ApiOkResponse({
    description: 'The person has been successfully updated',
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    description: 'Person with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The person already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a person', type: UpdatePersonDto })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Observable<PersonEntity> {
    return this._peopleService.update(params.id, updatePersonDto);
  }

  /**
   * Handler to answer to DELETE /people/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The person has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Person with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._peopleService.delete(params.id);
  }
}
