import { Exclude, Expose, Type } from 'class-transformer';
import { PersonAddressEntity } from './person-address.entity';

@Exclude()
export class PersonEntity {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  photo: string;

  @Expose()
  @Type(() => String)
  firstname: string;

  @Expose()
  @Type(() => String)
  lastname: string;

  @Expose()
  @Type(() => String)
  entity: string;

  @Expose()
  @Type(() => Number)
  birthDate: number;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  phone: string;

  @Expose()
  @Type(() => PersonAddressEntity)
  address: PersonAddressEntity;

  @Expose()
  @Type(() => Boolean)
  isManager: boolean;

  @Expose()
  @Type(() => String)
  manager: string;

  @Expose()
  @Type(() => String)
  managerId: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<PersonEntity>) {
    Object.assign(this, partial);
  }
}
