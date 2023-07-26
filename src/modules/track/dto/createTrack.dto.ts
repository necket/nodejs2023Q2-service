import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
