import { UserDb } from './user.db';
import { TrackDb } from './track.db';
import { ArtistDb } from './artist.db';

export const db = {
  user: new UserDb(),
  track: new TrackDb(),
  artist: new ArtistDb(),
};
