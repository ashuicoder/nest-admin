import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsInt()
  pid: number;

  @IsInt()
  sort: number;

  @IsBoolean()
  @IsOptional()
  enable: boolean;

  code: string;
}
