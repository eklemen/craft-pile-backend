import {
  Controller,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3Service } from '../s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Context } from '@nestjs/graphql';
import { Ctx } from '../types/context';
import { NewPhotoDetails, PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly photoService: PhotoService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPhoto(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Context() ctx: Ctx,
    @Res() res: Response,
  ) {
    try {
      await this.s3Service.putObject({
        image: file.buffer,
        body: req.body,
        user: ctx.req.user,
      });
      const photoDetails: NewPhotoDetails = {
        accountId: ctx.req.user.accountId,
        objectKey: req.body.objectKey,
        childId: req.body.childId,
      };
      if (req.body.albumId) {
        photoDetails.albumId = req.body.albumId;
      }
      await this.photoService.savePhoto(photoDetails);
      return res.status(HttpStatus.OK).json({ message: 'Photo uploaded' });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: err.message, message: 'Photo upload failed' });
    }
  }

  // @Get('list')
  // @UseGuards(JwtAuthGuard)
  // async listPhotos(
  //   @Req() req: any,
  //   @UploadedFile() file: Express.Multer.File,
  //   @Context() ctx: Ctx,
  //   @Res() res: Response,
  // ) {
  //   const r = await this.s3Service.getPresignedUrl({
  //     key: req.body.objectKey,
  //     accountId: ctx.req.user.accountId,
  //   });
  //   return res.status(HttpStatus.OK).json({ url: r });
  // }
}
