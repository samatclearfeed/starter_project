import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum dataType {
  string = 'string',
  boolean = 'boolean',
  number = 'number',
}

export class settingsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @IsNotEmpty()
  @IsEnum(dataType)
  readonly data_type: dataType;
}
