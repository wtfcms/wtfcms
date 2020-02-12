import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

class CommonDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string;
}

export class CreateAdminGroupDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  enable: boolean;

  @IsOptional()
  comments: string;
}

export class UpdateAdminGroupDto extends CreateAdminGroupDto {}

export class DeleteAdminGroupDto extends CommonDto {}

export class FindOneAdminGroupDto extends CommonDto {}
