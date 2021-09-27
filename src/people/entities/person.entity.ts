import { Exclude, Expose, Type } from 'class-transformer';
import { PersonAddressEntity } from './person-address.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class PersonEntity {
  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'photo', description: 'Photo URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @Expose()
  @Type(() => String)
  photo: string;

  @ApiProperty({ name: 'firstname', description: 'Firstname', example: 'Mclaughlin' })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiProperty({ name: 'lastname', description: 'Lastname', example: 'Cochran' })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiProperty({ name: 'entity', description: 'Entity where person works', example: 'UTARA' })
  @Expose()
  @Type(() => String)
  entity: string;

  @ApiProperty({ name: 'birthDate', description: 'Birthdate in timestamp format', example: '101343600000' })
  @Expose()
  @Type(() => Number)
  birthDate: number;

  @ApiProperty({ name: 'email', description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({ name: 'phone', description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @Expose()
  @Type(() => String)
  phone: string;

  @ApiProperty({ name: 'address', description: 'Address' })
  @Expose()
  @Type(() => PersonAddressEntity)
  address: PersonAddressEntity;

  @ApiProperty({ name: 'isManager', description: 'Flag to know if this person is a manager', example: false })
  @Expose()
  @Type(() => Boolean)
  isManager: boolean;

  @ApiPropertyOptional({ name: 'manager', description: 'Name of the manager', example: 'Mclaughlin' })
  @Expose()
  @Type(() => String)
  manager: string;

  @ApiPropertyOptional({
    name: 'managerId',
    description: 'Unique identifier of the manager',
    example: '5763cd4dc378a38ecd387737',
  })
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
