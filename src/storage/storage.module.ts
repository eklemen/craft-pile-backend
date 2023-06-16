import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StorageService } from './storage.service';
import { STORAGE_OPTIONS } from './storage.constants';
import * as optionTypes from './interfaces';

@Module({})
export class StorageModule {
  static register(
    options: optionTypes.StorageOptions,
    isGlobal: boolean,
  ): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_OPTIONS,
          useValue: options,
        },
        StorageService,
      ],
      exports: [StorageService],
      global: isGlobal,
    };
  }

  static registerAsync(
    options: optionTypes.StorageAsyncOptions,
  ): DynamicModule {
    const { isGlobal, ...opts } = options;
    const asyncOpts = this.createAsyncProviders(opts);
    return {
      module: StorageModule,
      imports: opts.imports,
      providers: [StorageService, ...asyncOpts],
      exports: [StorageService],
      global: isGlobal,
    };
  }

  // The methods below are used to create dynamic options.
  // Do not modify unless you know what you are doing.
  private static createAsyncProviders(
    options: optionTypes.StorageAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: optionTypes.StorageAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: STORAGE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: STORAGE_OPTIONS,
      useFactory: async (optionsFactory: optionTypes.StorageOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
