import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { IdParams } from 'src/common/dto/id.params';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  getAlbumById(@Param() { id }: IdParams) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put('/:id')
  updateAlbum(@Param() { id }: IdParams, @Body() dto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: IdParams) {
    return this.albumService.deleteAlbum(id);
  }
}
