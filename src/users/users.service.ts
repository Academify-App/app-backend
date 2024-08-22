import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password, identity } = registerUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password_hash,
      identity,
    });

    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id }); // Return the updated user
  }
}
