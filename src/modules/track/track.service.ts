import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  public getAllTracks() {
    return this.trackRepository.find();
  }

  public async getTrackById(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NotFoundException(`Track with id: ${id} not found`);

    return track;
  }

  public createTrack(createDto: CreateTrackDto) {
    const track = this.trackRepository.create(createDto);
    return this.trackRepository.save(track);
  }

  public async updateTrack(id: string, updateDto: UpdateTrackDto) {
    const track = await this.getTrackById(id);

    return this.trackRepository.save({ ...track, ...updateDto });
  }

  public async deleteTrack(id: string) {
    const track = await this.getTrackById(id);
    await this.trackRepository.remove(track);

    return null;
  }
}
