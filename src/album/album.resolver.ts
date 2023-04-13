import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAlbumInput } from '../graphql';
import { Ctx } from '../types/context';

@Resolver()
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createAlbum')
  async createAlbum(
    @Args('input') input: CreateAlbumInput,
    @Context() ctx: Ctx,
  ) {
    return await this.albumService.createAlbum(input, ctx.req.user.accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Query('getAlbumsForChild')
  async getAlbumsForChild(@Args('input') input: CreateAlbumInput) {
    return await this.albumService.getAlbumsForChild(input);
  }
}
