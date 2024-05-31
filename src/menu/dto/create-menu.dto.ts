import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Status } from 'src/types';

enum Type {
  Option1 = 1,
  Option2 = 2,
}

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsInt()
  pid: number;

  @IsInt()
  sort: number;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  code: string;
}
