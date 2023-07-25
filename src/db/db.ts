import { UserDb } from './user.db';
import { TrackDb } from './track.db';

export const db = {
  user: new UserDb(),
  track: new TrackDb(),
};
