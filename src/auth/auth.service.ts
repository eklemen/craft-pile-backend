import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
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

  async login(user: { email: string; password: number }) {
    const payload = { email: user.email, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ email, password }: { email: string; password: string }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.userService.createUser({
      email,
      password: hashedPassword,
    });
  }
}
