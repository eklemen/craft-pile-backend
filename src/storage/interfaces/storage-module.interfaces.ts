import { ModuleMetadata, Type } from '@nestjs/common';

export interface StorageOptions {
  connectionString: string;
  container: string;
}

export interface StorageOptionsFactory {
  createOptions(): Promise<StorageOptions> | StorageOptions;
}

export interface StorageAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<StorageOptionsFactory>;
  useClass?: Type<StorageOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<StorageOptions> | StorageOptions;
  inject?: any[];
  isGlobal?: boolean;
}
