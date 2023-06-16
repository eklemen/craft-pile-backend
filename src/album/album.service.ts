import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Album, CreateAlbumInput } from '../graphql';
import { Album as AlbumModel } from '../db/models/Album.model';
import { InjectEntityManager } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AlbumService {
  constructor(
    private datasource: DataSource,
    @InjectEntityManager() private entityManager: EntityManager,
    private s3Service: StorageService,
  ) {}

  async createAlbum(album: CreateAlbumInput, accountId: string) {
    // This returns the new Album record
    // Might be all thats needed
    await this.datasource.manager.save(AlbumModel, {
      name: album.name,
      description: album?.description,
      account: { id: accountId },
      child: { id: album.childId },
    });
    return await this.datasource.manager.find(AlbumModel, {
      where: {
        account: { id: accountId },
        child: { id: album.childId },
      },
    });
  }

  async getAlbumsForChild({ childId }: CreateAlbumInput) {
    const query = `
SELECT 
    album.*,
    child.name child_name,
    child.id child_id,
    photo.id photo_id,
    photo.bucket_name photo_bucket_name,
    photo.object_key photo_object_key,
    photo.thumbnail_key photo_thumbnail_key,
    photo.description photo_description,
    photo.date_of_photo photo_date_of_photo
  FROM 
    album
  LEFT JOIN 
    child ON album.child_id = child.id
  LEFT JOIN LATERAL (
    SELECT 
      p.*
    FROM 
      photo p
    WHERE 
      p.album_id = album.id
    ORDER BY 
      p.id DESC
    LIMIT 1
  ) AS photo ON TRUE
  WHERE 
    album.child_id = $1;
`;
    const result = await this.entityManager.query(query, [childId]);
    const resPromises = result.map(async (album: Record<string, any>) => {
      const albumObj: Album = {
        id: album.id,
        name: album.name,
        description: album.description,
        photos: [],
      };
      if (!album.photo_thumbnail_key) {
        return albumObj;
      }
      const presignedUrl = await this.s3Service.getPresignedUrl({
        key: album.photo_thumbnail_key,
      });
      albumObj.photos[0] = {
        id: album.photo_id,
        bucketName: album.photo_bucket_name,
        objectKey: album.photo_object_key,
        thumbnailKey: album.photo_thumbnail_key,
        description: album.photo_description,
        dateOfPhoto: album.photo_date_of_photo,
        presignedUrl,
      };
      return albumObj;
    });

    return Promise.all(resPromises);
  }
}
