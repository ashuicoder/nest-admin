import { IsInt } from 'class-validator';

export class QueryUserDto {
  id: number;

  @IsInt()
  current: number;

  @IsInt()
  size: number;

  username: string;

  account: string;

  status: number;
}
