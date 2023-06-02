import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Ctx } from '../types/context';
import { GetUserOutput } from '../graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async getUser(_: any, @Context() ctx: Ctx): Promise<GetUserOutput> {
    try {
      const data = await this.userService.getUserById(ctx.req.user.email);
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }
}
