import { NotFoundException } from '@nestjs/common';

export class FavoritesDb {
  public tracks: FavoriteEntity;
  public albums: FavoriteEntity;
  public artists: FavoriteEntity;

  constructor() {
    this.tracks = new FavoriteEntity();
    this.albums = new FavoriteEntity();
    this.artists = new FavoriteEntity();
  }
}

class FavoriteEntity {
  private entities: string[];

  constructor() {
    this.entities = [];
  }

  public find = () => {
    return this.entities;
  };

  public findByIdOrFail = (id: string) => {
    const entity = this.entities.find((entityId) => entityId === id);
    if (!entity) {
      throw new NotFoundException(`Entity with id: ${id} is not favorite`);
    }

    return entity;
  };

  public create = (id: string) => {
    if (this.entities.indexOf(id) === -1) {
      this.entities = [...this.entities, id];
    }
    return id;
  };

  public delete = (id: string) => {
    this.entities = this.entities.filter((entityId) => entityId !== id);
    return null;
  };

  public deleteOrFail = (id: string) => {
    this.findByIdOrFail(id);
    return this.delete(id);
  };
}
