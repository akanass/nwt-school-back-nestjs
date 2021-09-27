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

export class UpdatePersonDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  entity?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @IsOptional()
  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  address?: PersonAddressDto;

  @IsOptional()
  @IsBoolean()
  isManager?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  manager?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  managerId?: string;
}
