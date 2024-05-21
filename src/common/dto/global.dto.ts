import { IsNumberString } from 'class-validator';

export class GlobalPageQueryDto {
  @IsNumberString()
  current: number;

  @IsNumberString()
  size: number;
}
