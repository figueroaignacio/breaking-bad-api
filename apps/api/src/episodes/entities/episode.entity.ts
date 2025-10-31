// Entities
import { Death } from 'src/deaths/entities/death.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

// ORM Decorators
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  season: number;

  @Column({ type: 'int' })
  episode: number;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'air_date' })
  airDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  director: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  writer: string;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'imdb_rating' })
  imdbRating: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  duration: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  poster: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Quote, (quote) => quote.episode)
  quotes: Quote[];

  @OneToMany(() => Death, (death) => death.episode)
  deaths: Death[];
}
