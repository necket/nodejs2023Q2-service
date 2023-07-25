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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { IdParams } from 'src/common/dto/id.params';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  getTrackById(@Param() { id }: IdParams) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put('/:id')
  updateTrack(@Param() { id }: IdParams, @Body() dto: UpdateTrackDto) {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param() { id }: IdParams) {
    return this.trackService.deleteTrack(id);
  }
}
