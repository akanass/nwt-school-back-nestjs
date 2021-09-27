import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}
