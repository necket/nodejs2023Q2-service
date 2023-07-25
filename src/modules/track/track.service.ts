import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  public getAllTracks() {
    return db.track.find();
  }

  public getTrackById(id: string) {
    return db.track.findByIdOrFail(id);
  }

  public createTrack(createDto: CreateTrackDto) {
    return db.track.create(createDto);
  }

  public updateTrack(id: string, updateDto: UpdateTrackDto) {
    return db.track.update(id, updateDto);
  }

  public deleteTrack(id: string) {
    return db.track.delete(id);
  }
}
