import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  pid: number;

  @IsNotEmpty()
  sort: number;

  @IsNumber()
  status: number;
}
