import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PersonAddressEntity {
  @ApiProperty({ name: 'street', description: 'Street', example: 'Jewel Street' })
  @Expose()
  street: string;

  @ApiProperty({ name: 'postalCode', description: 'Postal code', example: '61400' })
  @Expose()
  postalCode: string;

  @ApiProperty({ name: 'city', description: 'City', example: 'Snelling' })
  @Expose()
  city: string;
}
