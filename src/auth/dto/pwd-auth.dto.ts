import { IsInt, IsString, IsNumber } from 'class-validator';

export class PwdAuthDto {
  @IsString()
  pwd: string;

  @IsString()
  oldPwd: string;

  @IsInt()
  validId: number;

  @IsNumber()
  answer: number;
}
