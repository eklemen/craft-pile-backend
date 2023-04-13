import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../db/models/User.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
