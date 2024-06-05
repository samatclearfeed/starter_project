import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum data_type {
  string = 'string',
  boolean = 'boolean',
  number = 'number',
}

export class SettingsDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  @IsEnum(data_type)
  readonly data_type: data_type;
}
