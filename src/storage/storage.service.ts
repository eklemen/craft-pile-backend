import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as sharp from 'sharp';
import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
} from '@azure/storage-blob';
import { STORAGE_OPTIONS } from './storage.constants';
import * as optionTypes from './interfaces';
import { Ctx } from '../types/context';

@Injectable()
export class StorageService implements OnModuleInit {
  client: BlobServiceClient;
  containerClient: ContainerClient;

  constructor(
    @Inject(STORAGE_OPTIONS) private options: optionTypes.StorageOptions,
  ) {}

  onModuleInit() {
    console.log(
      'this.options.connectionString-------->',
      this.options.connectionString,
    );
    this.client = BlobServiceClient.fromConnectionString(
      this.options.connectionString,
    );
    this.containerClient = this.client.getContainerClient(
      this.options.container,
    );
  }

  getBlobClient(blobName: string): BlockBlobClient {
    return this.containerClient.getBlockBlobClient(blobName);
  }

  static buildOriginalKey(accountId: string, key: string): string {
    return `${accountId}/originals/${key}.jpeg`;
  }

  static buildThumbnailKey(accountId: string, key: string): string {
    return `${accountId}/thumbnails/${key}.jpeg`;
  }

  static buildStorageKeys(accountId: string, key: string) {
    return {
      original: StorageService.buildOriginalKey(accountId, key),
      thumbnail: StorageService.buildThumbnailKey(accountId, key),
    };
  }

  public async putObject({
    image,
    body,
    user,
  }: {
    image: Buffer;
    body: Record<string, string>;
    user: Ctx['req']['user'];
  }): Promise<BlockBlobUploadResponse[]> {
    const { original, thumbnail } = StorageService.buildStorageKeys(
      user.accountId,
      body.objectKey,
    );
    const blobClient = this.getBlobClient(original);
    const blobClientThumb = this.getBlobClient(thumbnail);
    const thumbnailResized = await sharp(image)
      .resize(250, 250)
      .jpeg()
      .toBuffer();
    const originalUpload = blobClient.upload(image, image.length);
    const thumbUpload = blobClientThumb.upload(
      thumbnailResized,
      thumbnailResized.length,
    );
    return await Promise.all([originalUpload, thumbUpload]);
  }

  public async getPresignedUrl({ key }: { key: string }): Promise<string> {
    // const getObjectInput: GetObjectCommandInput = {
    //   Bucket: this.options.bucket,
    //   Key: key,
    // };
    // const command = new GetObjectCommand(getObjectInput);
    // return getSignedUrl(this.client, command, {
    //   expiresIn: 36000,
    // });
    return '';
  }

  public async deleteObjects(keys: { Key: string }[]) {
    // const params = {
    //   Bucket: this.options.bucket,
    //   Delete: {
    //     Objects: keys,
    //   },
    // };
    // return await this.client.send(new DeleteObjectsCommand(params));
    return;
  }
}
