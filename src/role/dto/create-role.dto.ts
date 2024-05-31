import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  enable: boolean;
}
