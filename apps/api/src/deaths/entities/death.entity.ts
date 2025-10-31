// Entities
import { Character } from 'src/characters/entities/character.entity';
import { Episode } from 'src/episodes/entities/episode.entity';

// ORM Decorators
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('deaths')
export class Death {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'victim_id' })
  victimId: number;

  @Column({ type: 'int', nullable: true, name: 'killer_id' })
  killerId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  method: string;

  @Column({ type: 'int', nullable: true, name: 'episode_id' })
  episodeId: number;

  @Column({ type: 'text', nullable: true })
  circumstances: string;

  @Column({ type: 'int', nullable: true, name: 'brutality_level' })
  brutalityLevel: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Character, (character) => character.deathsAsVictim, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'victim_id' })
  victim: Character;

  @ManyToOne(() => Character, (character) => character.deathsAsKiller, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'killer_id' })
  killer: Character;

  @ManyToOne(() => Episode, (episode) => episode.deaths, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
