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

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  entity: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('FR')
  phone: string;

  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  address: PersonAddressDto;

  @IsBoolean()
  isManager: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  manager?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  managerId?: string;
}
