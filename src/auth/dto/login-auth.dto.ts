import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
