import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Track } from './types/Track';
import { mockTracks } from './mockData/mockTracks';

export class TrackDb {
  private tracks: Track[] = [];

  constructor() {
    this.tracks = mockTracks;
  }

  public findById = (id: string) => {
    return this.tracks.find((track) => track.id === id);
  };

  public findByIdOrFail = (id: string) => {
    const track = this.findById(id);
    if (!track) throw new NotFoundException(`Track with id: ${id} not found`);
    return track;
  };

  public find = () => {
    return this.tracks;
  };

  public create = ({
    name,
    artistId = null,
    albumId = null,
    duration,
  }: Partial<Track>) => {
    const track: Track = {
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks = [...this.tracks, track];

    return track;
  };

  public update = (id: string, fields: Partial<Track>) => {
    const track = this.findByIdOrFail(id);
    const updatedTrack = {
      ...track,
      ...fields,
    };

    this.tracks = this.tracks.map((trck) =>
      trck.id === id ? updatedTrack : trck,
    );
    return updatedTrack;
  };

  public delete = (id: string) => {
    this.findByIdOrFail(id);
    this.tracks = this.tracks.filter((trck) => trck.id !== id);
    return null;
  };

  public deleteArtist = (artistId: string) => {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
    return null;
  };

  public deleteAlbum = (albumId: string) => {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
    return null;
  };
}
