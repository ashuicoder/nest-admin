import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/types';

export class QueryRoleDto {
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

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
