import {
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsMobilePhone,
  IsBoolean,
  IsOptional,
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

  @IsBoolean()
  @IsOptional()
  enable: boolean;
}
