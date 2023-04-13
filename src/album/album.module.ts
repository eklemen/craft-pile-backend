import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { Album } from '../db/models/Album.model';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  providers: [AlbumService, AlbumResolver],
  exports: [AlbumService],
})
export class AlbumModule {}
