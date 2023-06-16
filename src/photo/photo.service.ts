import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Photo } from '../db/models/Photo.model';
import { StorageService } from '../storage/storage.service';
import {
  AssignPhotosToAlbumInput,
  AssignPhotosToAnotherChildInput,
  GetPhotosForAlbumInput,
} from '../graphql';

export interface NewPhotoDetails {
  accountId: string;
  objectKey: string;
  childId: string;
  albumId?: string;
}

interface RawUnsortedPhoto {
  description?: string;
  child_id: string;
  child_name: string;
  photo_id: string;
  bucket_name: string;
  object_key: string;
  thumbnail_key: string;
  date_of_photo?: string;
}

interface PilePhoto {
  id: string;
  bucketName: string;
  objectKey: string;
  thumbnailKey: string;
  description?: string;
  dateOfPhoto?: string;
  presignedUrl?: string;
}

export interface GroupedUnsortedChildPhotos {
  id: string;
  name: string;
  photos: PilePhoto[];
}

interface GroupedUnsorted {
  [key: string]: GroupedUnsortedChildPhotos;
}

@Injectable()
export class PhotoService {
  constructor(
    private readonly datasource: DataSource,
    private readonly configService: ConfigService,
    private readonly s3Service: StorageService,
  ) {}

  async savePhoto(photoDetails: NewPhotoDetails) {
    const bucketName = this.configService.get<string>('AWS_BUCKET');
    const { original, thumbnail } = StorageService.buildStorageKeys(
      photoDetails.accountId,
      photoDetails.objectKey,
    );
    return this.datasource.manager.save(Photo, {
      bucketName,
      objectKey: original,
      thumbnailKey: thumbnail,
      child: { id: photoDetails.childId },
      album: { id: photoDetails.albumId || null },
      account: { id: photoDetails.accountId },
    });
  }

  async getPhotosForAlbum(input: GetPhotosForAlbumInput) {
    return this.datasource.manager.find(Photo, {
      where: { album: { id: input.albumId } },
    });
  }

  async getPilePhotos(
    accountId: string,
  ): Promise<GroupedUnsortedChildPhotos[]> {
    const photosWithoutAlbum = await this.datasource.manager
      .createQueryBuilder(Photo, 'photo')
      .leftJoin('photo.album', 'album')
      .leftJoin('photo.child', 'child')
      .leftJoin('photo.account', 'account')
      .where('album.id IS NULL')
      .andWhere('account.id = :accountId', { accountId })
      .select([
        'child.id AS child_id',
        'child.name AS child_name',
        'photo.id AS photo_id',
        'photo.bucket_name',
        'photo.object_key',
        'photo.thumbnail_key',
        'photo.description',
        'photo.date_of_photo',
      ])
      .orderBy('child.id')
      .getRawMany();
    const groupedPhotos: GroupedUnsorted = photosWithoutAlbum.reduce(
      (grouped: GroupedUnsorted, photo: RawUnsortedPhoto) => {
        const { child_id, child_name } = photo;
        if (!grouped[child_id]) {
          grouped[child_id] = {
            id: child_id,
            name: child_name,
            photos: [],
          };
        }

        grouped[child_id].photos.push({
          id: photo.photo_id,
          bucketName: photo.bucket_name,
          objectKey: photo.object_key,
          thumbnailKey: photo.thumbnail_key,
          description: photo.description || null,
          dateOfPhoto: photo.date_of_photo,
        });

        return grouped;
      },
      {} as GroupedUnsorted,
    );
    const getPresigned = async (photo: PilePhoto) => {
      const presignedUrl = await this.s3Service.getPresignedUrl({
        key: photo.thumbnailKey,
      });
      return {
        ...photo,
        presignedUrl,
      };
    };
    const processData = async (data: GroupedUnsortedChildPhotos[]) => {
      const outerPromises = data.map(async (item) => {
        const innerPromises = item.photos.map((photo) => getPresigned(photo));
        const resolvedPhotos = await Promise.all(innerPromises);

        return {
          ...item,
          photos: resolvedPhotos,
        };
      });

      return await Promise.all(outerPromises);
    };
    return await processData(Object.values(groupedPhotos));
  }

  async deletePhotos(photoIds: string[]) {
    const photos = await this.datasource.manager.find(Photo, {
      where: { id: In(photoIds) },
    });
    const keys = photos.reduce((acc, photo) => {
      acc.push({ Key: photo.objectKey }, { Key: photo.thumbnailKey });
      return acc;
    }, []);
    await this.s3Service.deleteObjects(keys);
    await this.datasource.manager.delete(Photo, { id: In(photoIds) });
    return photoIds;
  }

  async assignPhotosToAlbum({ albumId, photoIds }: AssignPhotosToAlbumInput) {
    await this.datasource.manager.update(
      Photo,
      { id: In(photoIds) },
      { album: { id: albumId } },
    );
    return photoIds;
  }

  async assignPhotosToAnotherChild({
    childId,
    photoIds,
  }: AssignPhotosToAnotherChildInput) {
    await this.datasource.manager.update(
      Photo,
      { id: In(photoIds) },
      { child: { id: childId } },
    );
    return photoIds;
  }
}
