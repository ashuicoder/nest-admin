import { IsNumber, IsString, IsInt } from 'class-validator';

export class PwdUserDto {
  @IsString()
  pwd: string;

  @IsInt()
  validId: number;

  @IsNumber()
  answer: number;
}
