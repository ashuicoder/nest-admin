import { IsInt } from 'class-validator';

export class QueryRoleDto {
  id: number;

  @IsInt()
  current: number;

  @IsInt()
  size: number;

  name: string;

  code: string;

  status: number;
}
