import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PEOPLE } from '../data/people';
import { Person } from './people.types';

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
