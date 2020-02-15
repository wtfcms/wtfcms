import { IsNotEmpty, IsString, MinLength, MaxLength, ValidateIf } from 'class-validator'

export class IdDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string;
}