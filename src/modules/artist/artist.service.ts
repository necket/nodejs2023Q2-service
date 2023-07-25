import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  public getAllArtists() {
    return db.artist.find();
  }

  public getArtistById(id: string) {
    return db.artist.findByIdOrFail(id);
  }

  public createArtist(createDto: CreateArtistDto) {
    return db.artist.create(createDto);
  }

  public updateArtist(id: string, updateDto: UpdateArtistDto) {
    return db.artist.update(id, updateDto);
  }

  public deleteArtist(id: string) {
    return db.artist.delete(id);
  }
}
