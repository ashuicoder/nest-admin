import { IsArray, IsNumber } from 'class-validator';

export class UserBindRolesDto {
  @IsArray()
  @IsNumber({}, { each: true })
  roles: number[];
}
