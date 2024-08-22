import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('send-otp')
  async sendOTP(@Body('email') email: string) {
    return await this.authService.sendOTP(email);
  }

  @Post('verify-otp')
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
    return await this.authService.verifyOTP(email, otp);
  }
}
