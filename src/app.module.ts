import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { options } from './db/datasource';
import { ChildModule } from './child/child.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot(options),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        emitTypenameField: true,
        outputAs: 'class',
      },
      playground: true,
      formatError: (error) => {
        return {
          message: error.message,
          status: error.extensions && error.extensions.code,
        };
      },
    }),
    StorageModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          connectionString: configService.get('STORAGE_CONNECTION_STRING'),
          container: configService.get('STORAGE_CONTAINER'),
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    UserModule,
    ChildModule,
    AlbumModule,
    PhotoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
