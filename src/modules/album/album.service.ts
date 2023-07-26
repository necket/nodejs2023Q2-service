import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  public getAllAlbums() {
    return db.album.find();
  }

  public getAlbumById(id: string) {
    return db.album.findByIdOrFail(id);
  }

  public createAlbum(createDto: CreateAlbumDto) {
    return db.album.create(createDto);
  }

  public updateAlbum(id: string, updateDto: UpdateAlbumDto) {
    return db.album.update(id, updateDto);
  }

  public deleteAlbum(id: string) {
    return db.album.delete(id);
  }
}
