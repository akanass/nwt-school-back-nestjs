import { PersonAddressDto } from './person-address.dto';

export class UpdatePersonDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly entity?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly address?: PersonAddressDto;
  readonly isManager?: boolean;
  readonly manager?: string;
  readonly managerId?: string;
}
