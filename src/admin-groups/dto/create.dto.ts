import {
  IsNotEmpty,
  IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CommonDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  enable: boolean;

  @ApiProperty()
  @IsOptional()
  comments: string;
}

export class CreateAdminGroupDto extends CommonDto {
}

export class updateAdminGroupDto extends CommonDto { }