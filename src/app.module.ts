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
import { S3Module } from './s3/s3.module';

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
    }),
    S3Module.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
        bucket: configService.get('AWS_BUCKET'),
      }),
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
