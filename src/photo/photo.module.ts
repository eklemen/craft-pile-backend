import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoResolver } from './photo.resolver';
import { PhotoController } from './photo.controller';

@Module({
  providers: [PhotoService, PhotoResolver],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
