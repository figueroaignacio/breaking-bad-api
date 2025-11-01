import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Entities
import {
  Character,
  CharacterCategory,
  CharacterStatus,
} from '../characters/entities/character.entity';
import { Death } from '../deaths/entities/death.entity';
import { Episode } from '../episodes/entities/episode.entity';
import { Quote } from '../quotes/entities/quote.entity';

// JSON data
import charactersData from './data/characters.json';
import deathsData from './data/deaths.json';
import episodesData from './data/episodes.json';
import quotesData from './data/quotes.json';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Character, Episode, Quote, Death],
  synchronize: false,
});

async function seed() {
  console.log('🌱 Starting seed with JSON data...\n');

  await AppDataSource.initialize();
  console.log('✅ Database connected\n');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Clean existing data
    console.log('🗑️  Cleaning existing data...');
    await queryRunner.query('DELETE FROM deaths');
    await queryRunner.query('DELETE FROM quotes');
    await queryRunner.query('DELETE FROM episodes');
    await queryRunner.query('DELETE FROM characters');

    // Reset sequences
    await queryRunner.query('ALTER SEQUENCE characters_id_seq RESTART WITH 1');
    await queryRunner.query('ALTER SEQUENCE episodes_id_seq RESTART WITH 1');
    await queryRunner.query('ALTER SEQUENCE quotes_id_seq RESTART WITH 1');
    await queryRunner.query('ALTER SEQUENCE deaths_id_seq RESTART WITH 1');
    console.log('✅ Data cleaned\n');

    const characterRepo = queryRunner.manager.getRepository(Character);
    const episodeRepo = queryRunner.manager.getRepository(Episode);
    const quoteRepo = queryRunner.manager.getRepository(Quote);
    const deathRepo = queryRunner.manager.getRepository(Death);

    // Seed Characters
    console.log('👥 Seeding characters...');
    const characters = await characterRepo.save(
      charactersData.map((char) => ({
        name: char.name,
        nickname: char.nickname,
        birthday: char.birthday,
        occupation: char.occupation,
        img: char.img,
        status: char.status as CharacterStatus,
        portrayed: char.portrayed,
        category: char.category as CharacterCategory,
        biography: char.biography,
        age: char.age,
      })),
    );
    console.log(`✅ ${characters.length} characters created\n`);

    // Create character map for lookups
    const characterMap = new Map(characters.map((c) => [c.name, c]));

    // Seed Episodes
    console.log('📺 Seeding episodes...');
    const episodes = await episodeRepo.save(
      episodesData.map((ep) => ({
        title: ep.title,
        season: ep.season,
        episode: ep.episode,
        air_date: ep.air_date,
        director: ep.director,
        writer: ep.writer,
        synopsis: ep.synopsis,
        imdb_rating: ep.imdb_rating,
        duration: ep.duration,
      })),
    );
    console.log(`✅ ${episodes.length} episodes created\n`);

    // Create episode map for lookups
    const episodeMap = new Map(episodes.map((e) => [`${e.season}-${e.episode}`, e]));

    // Seed Quotes
    console.log('💬 Seeding quotes...');
    const quotes = await quoteRepo.save(
      quotesData
        .map((q) => {
          const character = characterMap.get(q.character_name);
          const episode =
            q.episode_season && q.episode_number
              ? episodeMap.get(`${q.episode_season}-${q.episode_number}`)
              : null;

          if (!character) {
            console.warn(`⚠️  Character not found: ${q.character_name}`);
            return null;
          }

          return {
            quote: q.quote,
            characterId: character.id,
            episodeId: episode?.id || null,
            context: q.context,
          };
        })
        .filter((q) => q !== null),
    );
    console.log(`✅ ${quotes.length} quotes created\n`);

    // Seed Deaths
    console.log('💀 Seeding deaths...');
    const deaths = await deathRepo.save(
      deathsData
        .map((d) => {
          const victim = characterMap.get(d.victim_name);
          const killer = d.killer_name ? characterMap.get(d.killer_name) : null;
          const episode =
            d.episode_season && d.episode_number
              ? episodeMap.get(`${d.episode_season}-${d.episode_number}`)
              : null;

          if (!victim) {
            console.warn(`⚠️  Victim not found: ${d.victim_name}`);
            return null;
          }

          return {
            victimId: victim.id,
            killerId: killer?.id || null,
            method: d.method,
            episodeId: episode?.id || null,
            circumstances: d.circumstances,
            brutalityLevel: d.brutality_level,
          };
        })
        .filter((d) => d !== null),
    );
    console.log(`✅ ${deaths.length} deaths created\n`);

    await queryRunner.commitTransaction();

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('✅ SEED COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════');
    console.log(`👥 Characters: ${characters.length}`);
    console.log(`📺 Episodes:   ${episodes.length}`);
    console.log(`💬 Quotes:     ${quotes.length}`);
    console.log(`💀 Deaths:     ${deaths.length}`);
    console.log('═══════════════════════════════════════\n');
    console.log('🚀 You can now start the API with: pnpm run dev');
    console.log('📚 Documentation will be at: http://localhost:3000/docs\n');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('\n❌ Seed failed:', error);
    throw error;
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
