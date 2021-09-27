import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonAddressDto {
  @ApiProperty({
    name: 'street',
    description: 'Street',
    example: 'Jewel Street',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    name: 'postalCode',
    description: 'Postal code',
    example: '61400',
  })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ name: 'city', description: 'City', example: 'Snelling' })
  @IsString()
  @IsNotEmpty()
  city: string;
}
