import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { IdParams } from 'src/common/dto/id.params';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  getArtistById(@Param() { id }: IdParams) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put('/:id')
  updateArtist(@Param() { id }: IdParams, @Body() dto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: IdParams) {
    return this.artistService.deleteArtist(id);
  }
}
