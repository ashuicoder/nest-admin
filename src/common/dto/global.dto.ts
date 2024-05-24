import { IsNumber } from 'class-validator';

export class GlobalPageQueryDto {
  @IsNumber()
  current: number;

  @IsNumber()
  size: number;
}
