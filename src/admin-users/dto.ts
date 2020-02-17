import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CommonDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  username: boolean;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class CreateAdminUserDto extends CommonDto {}

export class updateAdminGroupDto extends CommonDto {}
