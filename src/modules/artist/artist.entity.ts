import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../track/track.entity';

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
}
