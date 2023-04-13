import { ModuleMetadata, Type } from '@nestjs/common';

export interface S3Options {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

export interface S3OptionsFactory {
  createOptions(): Promise<S3Options> | S3Options;
}

export interface S3AsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<S3OptionsFactory>;
  useClass?: Type<S3OptionsFactory>;
  useFactory?: (...args: any[]) => Promise<S3Options> | S3Options;
  inject?: any[];
  isGlobal?: boolean;
}
