import { IsNotEmpty } from 'class-validator'

export class DoLoginDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}