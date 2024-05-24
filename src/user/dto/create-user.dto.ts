import {
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsMobilePhone,
  IsInt,
} from 'class-validator';

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

  @IsMobilePhone()
  phone: string;

  @IsInt()
  status: number;
}
