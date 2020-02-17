import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { mixin } from '@nestjs/common';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  /**
   * 1 普通用户
   * 2 管理账号
   */
  @Min(1)
  @Max(2)
  type: number;
}
