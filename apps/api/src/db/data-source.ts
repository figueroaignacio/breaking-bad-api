// Config
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Entities
import { Character } from 'src/characters/entities/character.entity';
import { Death } from 'src/deaths/entities/death.entity';
import { Episode } from 'src/episodes/entities/episode.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Character, Episode, Quote, Death],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});
