import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { find, from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { PEOPLE } from '../data/people';
import { Person } from './people.types';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PeopleService {
  // private property to store all people
  private _people: Person[];

  /**
   * Class constructor
   */
  constructor() {
    this._people = [].concat(PEOPLE).map((person) => ({
      ...person,
      birthDate: this._parseDate(person.birthDate),
    }));
  }

  /**
   * Returns all existing people in the list
   *
   * @returns {Observable<Person[] | void>}
   */
  findAll = (): Observable<Person[] | void> =>
    of(this._people).pipe(
      map((_: Person[]) => (!!_ && !!_.length ? _ : undefined)),
    );

  /**
   * Returns randomly one person of the list
   *
   * @returns {Observable<Person | void>}
   */
  findRandom = (): Observable<Person | void> =>
    of(this._people[Math.round(Math.random() * this._people.length)]).pipe(
      map((_: Person) => (!!_ ? _ : undefined)),
    );

  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person
   *
   * @returns {Observable<Person>}
   */
  findOne = (id: string): Observable<Person> =>
    from(this._people).pipe(
      find((_: Person) => _.id === id),
      mergeMap((_: Person) =>
        !!_
          ? of(_)
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
   * @returns {Observable<Person>}
   */
  create = (person: CreatePersonDto): Observable<Person> =>
    from(this._people).pipe(
      find(
        (_: Person) =>
          _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
          _.firstname.toLowerCase() === person.firstname.toLowerCase(),
      ),
      mergeMap((_: Person) =>
        !!_
          ? throwError(
              () =>
                new ConflictException(
                  `People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`,
                ),
            )
          : this._addPerson(person),
      ),
    );

  /**
   * Add person with good data in people list
   *
   * @param person to add
   *
   * @returns {Observable<Person>}
   *
   * @private
   */
  private _addPerson = (person: CreatePersonDto): Observable<Person> =>
    of({
      ...person,
      id: this._createId(),
      birthDate: this._parseDate('06/05/1985'),
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
    }).pipe(tap((_: Person) => (this._people = this._people.concat(_))));

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

  /**
   * Creates a new id
   *
   * @returns {string}
   *
   * @private
   */
  private _createId = (): string => `${new Date().getTime()}`;
}