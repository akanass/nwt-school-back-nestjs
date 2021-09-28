import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  defaultIfEmpty,
  find,
  findIndex,
  from,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { PEOPLE } from '../data/people';
import { Person } from './people.types';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';
import { PeopleDao } from './dao/people.dao';
import { Person as P } from './schemas/person.schema';

@Injectable()
export class PeopleService {
  // private property to store all people
  private _people: Person[];

  /**
   * Class constructor
   *
   * @param {PeopleDao} _peopleDao instance of the DAO
   */
  constructor(private readonly _peopleDao: PeopleDao) {
    this._people = [].concat(PEOPLE).map((person) => ({
      ...person,
      birthDate: this._parseDate(person.birthDate),
    }));
  }

  /**
   * Returns all existing people in the list
   *
   * @returns {Observable<PersonEntity[] | void>}
   */
  findAll = (): Observable<PersonEntity[] | void> =>
    this._peopleDao.find().pipe(
      filter((_: P[]) => !!_),
      map((_: P[]) => _.map((__: P) => new PersonEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns randomly one person of the list
   *
   * @returns {Observable<PersonEntity | void>}
   */
  findRandom = (): Observable<PersonEntity | void> =>
    this._peopleDao.find().pipe(
      filter((_: P[]) => !!_),
      map((_: P[]) => _[Math.round(Math.random() * _.length)]),
      map((_: P) => new PersonEntity(_)),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person
   *
   * @returns {Observable<PersonEntity>}
   */
  findOne = (id: string): Observable<PersonEntity> =>
    this._peopleDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: P) =>
        !!_
          ? of(new PersonEntity(_))
          : throwError(
              () => new NotFoundException(`People with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if person already exists and add it in people list
   *
   * @param person to create
   *
   * @returns {Observable<PersonEntity>}
   */
  create = (person: CreatePersonDto): Observable<PersonEntity> =>
    this._addPerson(person).pipe(
      mergeMap((_: CreatePersonDto) => this._peopleDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: P) => new PersonEntity(_)),
    );

  /**
   * Update a person in people list
   *
   * @param {string} id of the person to update
   * @param person data to update
   *
   * @returns {Observable<PersonEntity>}
   */
  update = (id: string, person: UpdatePersonDto): Observable<PersonEntity> =>
    from(this._people).pipe(
      find(
        (_: Person) =>
          _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
          _.firstname.toLowerCase() === person.firstname.toLowerCase() &&
          _.id.toLowerCase() !== id.toLowerCase(),
      ),
      mergeMap((_: Person) =>
        !!_
          ? throwError(
              () =>
                new ConflictException(
                  `People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`,
                ),
            )
          : this._findPeopleIndexOfList(id),
      ),
      tap((index: number) => Object.assign(this._people[index], person)),
      map((index: number) => new PersonEntity(this._people[index])),
    );

  /**
   * Deletes one person in people list
   *
   * @param {string} id of the person to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._findPeopleIndexOfList(id).pipe(
      tap((_: number) => this._people.splice(_, 1)),
      map(() => undefined),
    );

  /**
   * Finds index of array for current person
   *
   * @param {string} id of the person to find
   *
   * @returns {Observable<number>}
   *
   * @private
   */
  private _findPeopleIndexOfList = (id: string): Observable<number> =>
    from(this._people).pipe(
      findIndex((_: Person) => _.id === id),
      mergeMap((index: number) =>
        index > -1
          ? of(index)
          : throwError(
              () => new NotFoundException(`People with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Add person with good data in people list
   *
   * @param person to add
   *
   * @returns {Observable<CreatePersonDto>}
   *
   * @private
   */
  private _addPerson = (person: CreatePersonDto): Observable<CreatePersonDto> =>
    of({
      ...person,
      birthDate: this._parseDate('06/05/1985'),
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
    });

  /**
   * Function to parse date and return timestamp
   *
   * @param {string} date to parse
   *
   * @returns {number} timestamp
   *
   * @private
   */
  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
