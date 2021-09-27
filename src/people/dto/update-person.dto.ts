import { PersonAddressDto } from './person-address.dto';
import {
  IsBoolean,
  IsEmail,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePersonDto {
  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
    example: 'Mclaughlin',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Cochran',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiPropertyOptional({
    name: 'entity',
    description: 'Entity where person works',
    example: 'UTARA',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  entity?: string;

  @ApiPropertyOptional({
    name: 'email',
    description: 'Email',
    example: 'Mclaughlin.Cochran@undefined.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    name: 'phone',
    description: 'Phone',
    example: '+33600000000',
    pattern: '/^(+d{11})$/',
  })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @ApiPropertyOptional({ name: 'address', description: 'Address' })
  @IsOptional()
  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  address?: PersonAddressDto;

  @ApiPropertyOptional({
    name: 'isManager',
    description: 'Flag to know if this person is a manager',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isManager?: boolean;

  @ApiPropertyOptional({
    name: 'manager',
    description: 'Name of the manager',
    example: 'Mclaughlin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  manager?: string;

  @ApiPropertyOptional({
    name: 'managerId',
    description: 'Unique identifier of the manager',
    example: '5763cd4dc378a38ecd387737',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  managerId?: string;
}
