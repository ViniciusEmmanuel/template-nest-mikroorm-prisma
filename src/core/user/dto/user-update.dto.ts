import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsString()
  email = '';
}
