import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: null })
  artistId: string;

  @Column({ default: null })
  albumId: string;

  @Column({ default: null })
  trackId: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  album: Album;

  @ManyToOne(() => Track, (track) => track.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  track: Track;
}
