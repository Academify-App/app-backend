import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendOTP(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = this.generateOTP();

    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
    await this.usersService.update(user.id, {
      otp: user.otp,
      otpExpiresAt: user.otpExpiresAt,
    });

    await this.mailService.sendOTP(email, otp);
    return { message: 'OTP sent to email' };
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  }

  async verifyOTP(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.otp !== otp || new Date() > user.otpExpiresAt) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.usersService.update(user.id, { otp: null, otpExpiresAt: null });
    return { message: 'OTP verified successfully' };
  }
}
