import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Ctx } from '../types/context';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async getUser(_: any, @Context() ctx: Ctx) {
    return await this.userService.getUserById(ctx.req.user.email);
  }
}
