import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { db } from 'src/db/db';

@Injectable()
export class FavoritesService {
  public getAllFavorites() {
    const artistsIds = db.favorites.artists.find();
    const albumsIds = db.favorites.albums.find();
    const tracksIds = db.favorites.tracks.find();

    const artists = db.artist.findMany(artistsIds);
    const albums = db.album.findMany(albumsIds);
    const tracks = db.track.findMany(tracksIds);

    return { artists, albums, tracks };
  }

  public addTrack(id: string) {
    const track = db.track.findById(id);
    if (!track) this.throwUnprocessableExp('track', id);
    return db.favorites.tracks.create(id);
  }

  public addAlbum(id: string) {
    const album = db.album.findById(id);
    if (!album) this.throwUnprocessableExp('album', id);
    return db.favorites.albums.create(id);
  }

  public addArtist(id: string) {
    const artist = db.artist.findById(id);
    if (!artist) this.throwUnprocessableExp('artist', id);
    return db.favorites.artists.create(id);
  }

  public removeTrack(id: string) {
    return db.favorites.tracks.deleteOrFail(id);
  }

  public removeAlbum(id: string) {
    return db.favorites.albums.deleteOrFail(id);
  }

  public removeArtist(id: string) {
    return db.favorites.artists.deleteOrFail(id);
  }

  private throwUnprocessableExp(name: string, id: string) {
    throw new UnprocessableEntityException(
      `${name} with id: ${id} doesn't exist`,
    );
  }
}
