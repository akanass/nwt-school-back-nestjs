import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Person, PersonDocument } from '../schemas/person.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

@Injectable()
export class PeopleDao {
  /**
   * Class constructor
   *
   * @param {Model<PersonDocument>} _personModel instance of the model representing a Person
   */
  constructor(
    @InjectModel(Person.name)
    private readonly _personModel: Model<PersonDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns PersonModel[] or undefined
   *
   * @return {Observable<Person[] | void>}
   */
  find = (): Observable<Person[] | void> =>
    from(this._personModel.find({})).pipe(
      filter((docs: PersonDocument[]) => !!docs && docs.length > 0),
      map((docs: PersonDocument[]) =>
        docs.map((_: PersonDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one person of the list matching id in parameter
   *
   * @param {string} id of the person in the db
   *
   * @return {Observable<Person | void>}
   */
  findById = (id: string): Observable<Person | void> =>
    from(this._personModel.findById(id)).pipe(
      filter((doc: PersonDocument) => !!doc),
      map((doc: PersonDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if person already exists with index and add it in people list
   *
   * @param {CreatePersonDto} person to create
   *
   * @return {Observable<Person>}
   */
  save = (person: CreatePersonDto): Observable<Person> =>
    from(new this._personModel(person).save()).pipe(
      map((doc: PersonDocument) => doc.toJSON()),
    );

  /**
   * Update a person in people list
   *
   * @param {string} id
   * @param {UpdatePersonDto} person
   *
   * @return {Observable<Person | void>}
   */
  findByIdAndUpdate = (
    id: string,
    person: UpdatePersonDto,
  ): Observable<Person | void> =>
    from(
      this._personModel.findByIdAndUpdate(id, person, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: PersonDocument) => !!doc),
      map((doc: PersonDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete a person in people list
   *
   * @param {string} id
   *
   * @return {Observable<Person | void>}
   */
  findByIdAndRemove = (id: string): Observable<Person | void> =>
    from(this._personModel.findByIdAndRemove(id)).pipe(
      filter((doc: PersonDocument) => !!doc),
      map((doc: PersonDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
