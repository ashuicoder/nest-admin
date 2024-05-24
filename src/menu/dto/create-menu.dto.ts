import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  pid: number;

  @IsInt()
  sort: number;

  @IsInt()
  status: number;
}
