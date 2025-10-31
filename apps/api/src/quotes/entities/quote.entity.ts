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

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  quote: string;

  @Column({ type: 'int', name: 'character_id' })
  characterId: number;

  @Column({ type: 'int', nullable: true, name: 'episode_id' })
  episodeId: number;

  @Column({ type: 'text', nullable: true })
  context: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Character, (character) => character.quotes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Episode, (episode) => episode.quotes, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
