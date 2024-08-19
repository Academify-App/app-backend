import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT as 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable synchronize in production
    }),
    UsersModule,
  ],
})
export class AppModule {}
