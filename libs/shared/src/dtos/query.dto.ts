import { IsOptional, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export const typeToNumber = prop => {
  return function(value) {
    value = value.object[prop];
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      return undefined;
    }
    return Number;
  };
};

export class FindOptionsDto {
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(typeToNumber('offset'))
  offset: number = 0;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(typeToNumber('limit'))
  limit: number = 10;
}
