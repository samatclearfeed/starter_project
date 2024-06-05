import { IsNotEmpty, IsString } from 'class-validator';

export class AccountsDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
