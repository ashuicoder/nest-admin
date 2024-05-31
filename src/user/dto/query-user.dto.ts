import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/types';

export class QueryUserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsInt()
  current: number;

  @IsInt()
  size: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  account: string;

  @IsEnum(Status)
  @IsOptional()
  enable: Status;
}
