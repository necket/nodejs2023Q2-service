import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { Artist } from './modules/artist/artist.entity';
import { User } from './modules/user/user.entity';
import { Track } from './modules/track/track.entity';
import { Album } from './modules/album/album.entity';
import { Favorite } from './modules/favorites/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'nest-app-db',
          port: 5432,
          database: config.get<string>('POSTGRES_USER'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          entities: [User, Artist, Track, Album, Favorite],
          synchronize: true,
        };
      },
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
