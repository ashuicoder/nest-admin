import { IsNotEmpty, IsEmail, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsUrl()
  photoUrl: string;

  @IsEmail()
  email: string;
}
