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
      user: {
        name: user.name,
        email: user.email,
        identity: user.identity,
      },
    };
  }

  async sendOTP(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = this.generateOTP();

    user.otp = otp;
    user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);
    await this.usersService.update(user.id, {
      otp: user.otp,
      otp_expires_at: user.otp_expires_at,
    });

    await this.mailService.sendOTP(email, otp);
    return { message: 'OTP sent to email' };
  }

  generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async verifyOTP(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.otp !== otp || new Date() > user.otp_expires_at) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.usersService.update(user.id, {
      otp: null,
      otp_expires_at: null,
    });
    return { message: 'OTP verified successfully' };
  }
}
