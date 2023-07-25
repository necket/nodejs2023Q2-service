import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Album } from './types/Album';
import { mockAlbums } from './mockData/mockAlbums';
import { db } from './db';

export class AlbumDb {
  private albums: Album[] = [];

  constructor() {
    this.albums = mockAlbums;
  }

  public findById = (id: string) => {
    return this.albums.find((album) => album.id === id);
  };

  public findByIdOrFail = (id: string) => {
    const album = this.findById(id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return album;
  };

  public find = () => {
    return this.albums;
  };

  public create = ({ name, year, artistId = null }: Partial<Album>) => {
    const album: Album = {
      id: uuid(),
      name,
      year,
      artistId,
    };

    this.albums = [...this.albums, album];

    return album;
  };

  public update = (id: string, fields: Partial<Album>) => {
    const album = this.findByIdOrFail(id);
    const updatedAlbum = {
      ...album,
      ...fields,
    };

    this.albums = this.albums.map((alb) =>
      alb.id === id ? updatedAlbum : alb,
    );
    return updatedAlbum;
  };

  public deleteArtist = (artistId: string) => {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: null } : album,
    );
    return null;
  };

  public delete = (id: string) => {
    this.findByIdOrFail(id);
    this.albums = this.albums.filter((alb) => alb.id !== id);

    db.track.deleteAlbum(id);

    return null;
  };
}
