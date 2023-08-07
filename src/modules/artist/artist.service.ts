import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  public getAllArtists() {
    return this.artistRepository.find();
  }

  public async getArtistById(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);

    return artist;
  }

  public createArtist(createDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createDto);

    return this.artistRepository.save(artist);
  }

  public async updateArtist(id: string, updateDto: UpdateArtistDto) {
    const artist = await this.getArtistById(id);

    return this.artistRepository.save({ ...artist, ...updateDto });
  }

  public async deleteArtist(id: string) {
    const artist = await this.getArtistById(id);
    await this.artistRepository.remove(artist);

    return null;
  }
}
