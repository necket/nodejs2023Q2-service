import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { IdParams } from 'src/common/dto/id.params';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(201)
  addTrack(@Param() { id }: IdParams) {
    return this.favoritesService.addTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  addAlbum(@Param() { id }: IdParams) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  addArtist(@Param() { id }: IdParams) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param() { id }: IdParams) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param() { id }: IdParams) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param() { id }: IdParams) {
    return this.favoritesService.removeArtist(id);
  }
}
