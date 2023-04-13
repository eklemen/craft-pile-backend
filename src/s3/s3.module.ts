import { DynamicModule, Module, Provider } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3_OPTIONS } from './s3.constants';
import * as optionTypes from './interfaces';

@Module({})
export class S3Module {
  static register(
    options: optionTypes.S3Options,
    isGlobal: boolean,
  ): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3_OPTIONS,
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
      global: isGlobal,
    };
  }

  static registerAsync(options: optionTypes.S3AsyncOptions): DynamicModule {
    const { isGlobal, ...opts } = options;
    const asyncOpts = this.createAsyncProviders(opts);
    return {
      module: S3Module,
      imports: opts.imports,
      providers: [S3Service, ...asyncOpts],
      exports: [S3Service],
      global: isGlobal,
    };
  }

  // The methods below are used to create dynamic options.
  // Do not modify unless you know what you are doing.
  private static createAsyncProviders(
    options: optionTypes.S3AsyncOptions,
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
    options: optionTypes.S3AsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: S3_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: S3_OPTIONS,
      useFactory: async (optionsFactory: optionTypes.S3OptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
