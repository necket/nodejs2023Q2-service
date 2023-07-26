import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
