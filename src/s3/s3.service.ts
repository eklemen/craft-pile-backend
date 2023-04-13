import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
  PutObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as sharp from 'sharp';
import { S3_OPTIONS } from './s3.constants';
import * as optionTypes from './interfaces';
import { Ctx } from '../types/context';

@Injectable()
export class S3Service implements OnModuleInit {
  client: S3Client;

  constructor(@Inject(S3_OPTIONS) private options: optionTypes.S3Options) {}

  onModuleInit() {
    this.client = new S3Client({
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey,
      },
    });
  }

  static buildOriginalKey(accountId: string, key: string): string {
    return `${accountId}/originals/${key}.jpeg`;
  }

  static buildThumbnailKey(accountId: string, key: string): string {
    return `${accountId}/thumbnails/${key}.jpeg`;
  }

  static buildS3Keys(accountId: string, key: string) {
    return {
      original: S3Service.buildOriginalKey(accountId, key),
      thumbnail: S3Service.buildThumbnailKey(accountId, key),
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
  }): Promise<PutObjectCommandOutput[]> {
    // Original image
    const input: PutObjectCommandInput = {
      Body: image,
      Bucket: this.options.bucket,
      Key: S3Service.buildOriginalKey(user.accountId, body.objectKey),
      ContentType: 'image/jpeg',
    };
    const command = new PutObjectCommand(input);
    // Thumbnail
    const thumbnail = await sharp(image).resize(250, 250).jpeg().toBuffer();
    const thumbnailInput: PutObjectCommandInput = {
      Body: thumbnail,
      Bucket: this.options.bucket,
      Key: S3Service.buildThumbnailKey(user.accountId, body.objectKey),
      ContentType: 'image/jpeg',
    };
    const thumbnailCommand = new PutObjectCommand(thumbnailInput);
    return await Promise.all([
      this.client.send(command),
      this.client.send(thumbnailCommand),
    ]);
  }

  public async getPresignedUrl({ key }: { key: string }): Promise<string> {
    const getObjectInput: GetObjectCommandInput = {
      Bucket: this.options.bucket,
      Key: key,
    };
    const command = new GetObjectCommand(getObjectInput);
    return getSignedUrl(this.client, command, {
      expiresIn: 36000,
    });
  }

  public async deleteObjects(keys: { Key: string }[]) {
    const params = {
      Bucket: this.options.bucket,
      Delete: {
        Objects: keys,
      },
    };
    return await this.client.send(new DeleteObjectsCommand(params));
  }
}
