import { IsInt, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;

  @IsInt()
  validId: number;

  @IsInt()
  answer: number | string;
}
