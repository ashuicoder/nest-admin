import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from 'src/types';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
