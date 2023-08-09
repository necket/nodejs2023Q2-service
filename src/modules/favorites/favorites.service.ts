import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/track.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  public async getAllFavorites() {
    const favorites = await this.favoritesRepository.find({
      relations: { album: true, artist: true, track: true },
    });

    const artists: Artist[] = [];
    const albums: Album[] = [];
    const tracks: Track[] = [];

    favorites.forEach(({ artist, album, track }) => {
      if (artist) artists.push(artist);
      if (album) albums.push(album);
      if (track) tracks.push(track);
    });

    return { artists, albums, tracks };
  }

  public async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) this.throwUnprocessableExp('track', id);
    await this.favoritesRepository.save({ trackId: track.id });
  }

  public async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) this.throwUnprocessableExp('album', id);
    await this.favoritesRepository.save({ albumId: album.id });
  }

  public async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) this.throwUnprocessableExp('artist', id);
    await this.favoritesRepository.save({ artistId: artist.id });
  }

  public async removeTrack(trackId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ trackId });
    if (!favorite) {
      return new NotFoundException(`Favorites with id: ${trackId} not found`);
    }
    await this.favoritesRepository.delete({ trackId });
  }

  public async removeAlbum(albumId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ albumId });
    if (!favorite) {
      return new NotFoundException(`Favorites with id: ${albumId} not found`);
    }
    await this.favoritesRepository.delete({ albumId });
  }

  public async removeArtist(artistId: string) {
    const favorite = await this.favoritesRepository.findOneBy({ artistId });
    if (!favorite) {
      return new NotFoundException(`Favorites with id: ${artistId} not found`);
    }
    await this.favoritesRepository.delete({ artistId });
  }

  private throwUnprocessableExp(name: string, id: string) {
    throw new UnprocessableEntityException(
      `${name} with id: ${id} doesn't exist`,
    );
  }
}
