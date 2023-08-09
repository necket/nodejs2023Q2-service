import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist, { onDelete: 'CASCADE' })
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist, { onDelete: 'CASCADE' })
  albums: Album[];
}
