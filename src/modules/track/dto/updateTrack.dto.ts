import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
