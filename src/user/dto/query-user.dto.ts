import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  enable: boolean;
}
