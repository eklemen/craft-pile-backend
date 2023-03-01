import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthUserInput } from '../graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation()
  async registerUser(@Args('input') input: AuthUserInput) {
    return await this.authService.register(input);
  }

  @Mutation()
  async login(@Args('input') input: AuthUserInput) {
    return await this.authService.login(input);
  }
}
