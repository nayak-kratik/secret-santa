import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
