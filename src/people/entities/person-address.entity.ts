import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonAddressEntity {
  @Expose()
  street: string;

  @Expose()
  postalCode: string;

  @Expose()
  city: string;
}
