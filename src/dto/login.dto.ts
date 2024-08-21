import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
