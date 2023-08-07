import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  public getAllAlbums() {
    return this.albumRepository.find();
  }

  public async getAlbumById(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);

    return album;
  }

  public createAlbum(createDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createDto);
    return this.albumRepository.save(album);
  }

  public async updateAlbum(id: string, updateDto: UpdateAlbumDto) {
    const album = await this.getAlbumById(id);

    return this.albumRepository.save({ ...album, ...updateDto });
  }

  public async deleteAlbum(id: string) {
    const album = await this.getAlbumById(id);
    await this.albumRepository.remove(album);

    return null;
  }
}
