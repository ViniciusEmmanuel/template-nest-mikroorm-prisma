import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsString()
  email = '';
}
