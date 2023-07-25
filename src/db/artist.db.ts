import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Artist } from './types/Artist';
import { mockArtists } from './mockData/mockArtists';
import { db } from './db';

export class ArtistDb {
  private artists: Artist[] = [];

  constructor() {
    this.artists = mockArtists;
  }

  public findById = (id: string) => {
    return this.artists.find((artist) => artist.id === id);
  };

  public findByIdOrFail = (id: string) => {
    const artist = this.findById(id);
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return artist;
  };

  public find = () => {
    return this.artists;
  };

  public create = ({ name, grammy = false }: Partial<Artist>) => {
    const artist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.artists = [...this.artists, artist];

    return artist;
  };

  public update = (id: string, fields: Partial<Artist>) => {
    const artist = this.findByIdOrFail(id);
    const updatedArtist = {
      ...artist,
      ...fields,
    };

    this.artists = this.artists.map((art) =>
      art.id === id ? updatedArtist : art,
    );
    return updatedArtist;
  };

  public delete = (id: string) => {
    this.findByIdOrFail(id);
    this.artists = this.artists.filter((art) => art.id !== id);

    db.track.deleteArtist(id);

    return null;
  };
}
