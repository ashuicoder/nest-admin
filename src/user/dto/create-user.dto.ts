import {
  IsNotEmpty,
  IsEmail,
  IsUrl,
  IsMobilePhone,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Status } from 'src/types';

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

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
