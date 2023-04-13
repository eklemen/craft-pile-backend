import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChildService } from './child.service';
import { UseGuards } from '@nestjs/common';
import { CreateChildInput, DeleteChildInput } from '../graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Ctx } from '../types/context';

@Resolver()
export class ChildResolver {
  constructor(private childService: ChildService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createChild')
  async createChild(
    @Args('input') input: CreateChildInput,
    @Context() ctx: Ctx,
  ) {
    return await this.childService.createChild(input, ctx.req.user.accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('deleteChild')
  async deleteChild(
    @Args('input') input: DeleteChildInput,
    @Context() ctx: Ctx,
  ) {
    return await this.childService.deleteChild(
      input.id,
      ctx.req.user.accountId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query('getChildren')
  async getChildren(@Context() ctx: Ctx) {
    return await this.childService.getChildren(ctx.req.user.accountId);
  }
}
