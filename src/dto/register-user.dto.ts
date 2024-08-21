import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(20, { message: 'password should not exceed 20 characters' })
  password: string;
}
