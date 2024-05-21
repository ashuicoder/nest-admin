import {
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsMobilePhone,
  IsNumber,
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

  @IsNumber()
  status: number;
}
