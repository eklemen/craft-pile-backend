import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhotoService } from './photo.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  GetPhotosForAlbumInput,
  DeletePhotosInput,
  AssignPhotosToAlbumInput,
  AssignPhotosToAnotherChildInput,
} from '../graphql';
import { Ctx } from '../types/context';

@Resolver()
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(JwtAuthGuard)
  @Query('getPhotosForAlbum')
  async getPhotosForAlbum(@Args('input') input: GetPhotosForAlbumInput) {
    return await this.photoService.getPhotosForAlbum(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query('getPilePhotos')
  async getPilePhotos(@Context() ctx: Ctx) {
    return await this.photoService.getPilePhotos(ctx.req.user.accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('deletePhotos')
  async deletePhotos(@Args('input') input: DeletePhotosInput) {
    return await this.photoService.deletePhotos(input.photoIds);
  }

  // TODO: resolve on client (filter out Ids)
  @UseGuards(JwtAuthGuard)
  @Mutation('assignPhotosToAlbum')
  async assignPhotosToAlbum(@Args('input') input: AssignPhotosToAlbumInput) {
    // returns array of photo ids
    return await this.photoService.assignPhotosToAlbum(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('assignPhotosToAnotherChild')
  async assignPhotosToAnotherChild(
    @Args('input') input: AssignPhotosToAnotherChildInput,
  ) {
    return await this.photoService.assignPhotosToAnotherChild(input);
  }
}
