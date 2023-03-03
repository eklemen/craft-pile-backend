import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthUserInput, AuthUserToken, User } from '../graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Mutation()
  async login(
    @Args('input') input: AuthUserInput,
    @Context() ctx: any,
  ): Promise<AuthUserToken> {
    return this.authService.login(ctx.req.user);
  }
}
