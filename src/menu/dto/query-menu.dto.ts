import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryMenuDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsInt()
  current: number;

  @IsInt()
  size: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsBoolean()
  @IsOptional()
  enable: boolean;
}
