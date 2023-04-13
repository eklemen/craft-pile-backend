import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../db/models/User.model';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserById(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user || !passwordValid) {
      throw new UnauthorizedException(
        'Could not find the user/password combination',
      );
    }
    if (user && passwordValid) return user;
    return null;
  }

  async register({ email, password }: { email: string; password: string }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
    });
    return { authToken: this.jwtService.sign(user) };
  }

  async login(user: User) {
    const plainUser = classToPlain(user);
    return { authToken: this.jwtService.sign(plainUser) };
  }
}
