import { UserRepository } from '../auth/user.repository';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [TypeOrmModule, UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}