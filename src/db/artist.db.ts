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

  public findMany = (ids: string[]) => {
    return this.artists.filter((artist) => ids.indexOf(artist.id) > -1);
  };

  public findManyOrFail = (ids: string[]) => {
    const artists = this.findMany(ids);
    if (artists.length !== ids.length) {
      throw new NotFoundException(`Artists not found`);
    }
    return artists;
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
    db.album.deleteArtist(id);
    db.favorites.artists.delete(id);

    return null;
  };
}
