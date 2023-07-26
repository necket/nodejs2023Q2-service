import { UserDb } from './user.db';
import { TrackDb } from './track.db';
import { ArtistDb } from './artist.db';
import { AlbumDb } from './album.db';
import { FavoritesDb } from './favorites.db';

export const db = {
  user: new UserDb(),
  track: new TrackDb(),
  artist: new ArtistDb(),
  album: new AlbumDb(),
  favorites: new FavoritesDb(),
};
