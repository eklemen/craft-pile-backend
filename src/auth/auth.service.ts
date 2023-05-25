import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../db/models/User.model';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.userService.getUserById(email);
    if (user) return user;
    return null;
  }
}
