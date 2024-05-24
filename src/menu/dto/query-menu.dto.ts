import { IsInt } from 'class-validator';

export class QueryMenuDto {
  id: number;

  @IsInt()
  current: number;

  @IsInt()
  size: number;

  name: string;

  code: string;

  status: number;
}
