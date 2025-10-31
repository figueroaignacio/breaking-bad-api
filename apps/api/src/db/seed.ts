// DB
import { AppDataSource } from './data-source';

// Entities
import {
  Character,
  CharacterCategory,
  CharacterStatus,
} from 'src/characters/entities/character.entity';
import { Death } from 'src/deaths/entities/death.entity';
import { Episode } from 'src/episodes/entities/episode.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // 🧩 Inicializar conexión
    await AppDataSource.initialize();
    console.log('📦 Database connected');

    const queryRunner = AppDataSource.createQueryRunner();

    // 🗑️ Limpiar datos previos con TRUNCATE CASCADE
    console.log('🗑️  Clearing existing data...');
    await queryRunner.query(`
      TRUNCATE TABLE deaths, quotes, episodes, characters RESTART IDENTITY CASCADE;
    `);

    // Repos
    const characterRepo = AppDataSource.getRepository(Character);
    const episodeRepo = AppDataSource.getRepository(Episode);
    const quoteRepo = AppDataSource.getRepository(Quote);
    const deathRepo = AppDataSource.getRepository(Death);

    // 👥 Seed Characters
    console.log('👥 Adding characters...');
    const walter = characterRepo.create({
      name: 'Walter White',
      nickname: 'Heisenberg',
      birthday: '09-07-1958',
      occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
      img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-s5b.jpg',
      status: CharacterStatus.DECEASED,
      portrayed: 'Bryan Cranston',
      category: CharacterCategory.BREAKING_BAD,
      biography:
        "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      age: 50,
    });

    const jesse = characterRepo.create({
      name: 'Jesse Pinkman',
      nickname: "Cap n' Cook",
      birthday: '09-24-1984',
      occupation: ['Meth Dealer', 'Meth Manufacturer'],
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg',
      status: CharacterStatus.ALIVE,
      portrayed: 'Aaron Paul',
      category: CharacterCategory.BREAKING_BAD,
      biography:
        'Jesse Bruce Pinkman is a former student of chemistry teacher Walter White and is partner in crime in the meth trade.',
      age: 25,
    });

    const skyler = characterRepo.create({
      name: 'Skyler White',
      nickname: 'Sky',
      birthday: '08-11-1970',
      occupation: ['Bookkeeper', 'Car Wash Manager', 'Taxi Dispatcher'],
      img: 'https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg',
      status: CharacterStatus.ALIVE,
      portrayed: 'Anna Gunn',
      category: CharacterCategory.BREAKING_BAD,
      biography: 'Skyler White is the wife of Walter White and the sister of Marie Schrader.',
      age: 40,
    });

    const hank = characterRepo.create({
      name: 'Hank Schrader',
      nickname: 'ASAC Schrader',
      birthday: '03-11-1966',
      occupation: ['DEA Agent'],
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/b/b5/Hank_Season_5.jpg',
      status: CharacterStatus.DECEASED,
      portrayed: 'Dean Norris',
      category: CharacterCategory.BREAKING_BAD,
      biography: 'Henry R. "Hank" Schrader is a DEA agent and Walter White\'s brother-in-law.',
      age: 44,
    });

    const saul = characterRepo.create({
      name: 'Saul Goodman',
      nickname: 'Jimmy McGill',
      birthday: '11-12-1960',
      occupation: ['Lawyer'],
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/1/16/Saul_Goodman.jpg',
      status: CharacterStatus.ALIVE,
      portrayed: 'Bob Odenkirk',
      category: CharacterCategory.ALL,
      biography:
        'Jimmy McGill, better known as Saul Goodman, is a criminal lawyer who represents Walter White and Jesse Pinkman.',
      age: 47,
    });

    const gus = characterRepo.create({
      name: 'Gustavo Fring',
      nickname: 'Gus',
      birthday: '04-26-1958',
      occupation: ['Drug Kingpin', 'Los Pollos Hermanos Owner'],
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/1/1f/BCS_S4_Gustavo_Fring.jpg',
      status: CharacterStatus.DECEASED,
      portrayed: 'Giancarlo Esposito',
      category: CharacterCategory.ALL,
      biography:
        'Gustavo "Gus" Fring is a Chilean-born Albuquerque restaurateur and philanthropist who uses his restaurant as a front for a massive drug operation.',
      age: 52,
    });

    const mike = characterRepo.create({
      name: 'Mike Ehrmantraut',
      nickname: 'Mike',
      birthday: '05-07-1944',
      occupation: ['Former Police Officer', 'Private Investigator', 'Hitman'],
      img: 'https://vignette.wikia.nocookie.net/breakingbad/images/e/e7/Mike_Season_5.jpg',
      status: CharacterStatus.DECEASED,
      portrayed: 'Jonathan Banks',
      category: CharacterCategory.ALL,
      biography:
        'Michael "Mike" Ehrmantraut is a former Philadelphia police officer who works for Gustavo Fring and later for Walter White.',
      age: 65,
    });

    await characterRepo.save([walter, jesse, skyler, hank, saul, gus, mike]);

    // 📺 Seed Episodes
    console.log('📺 Adding episodes...');
    const episode1 = episodeRepo.create({
      title: 'Pilot',
      season: 1,
      episode: 1,
      airDate: '2008-01-20',
      director: 'Vince Gilligan',
      writer: 'Vince Gilligan',
      synopsis:
        "When an unassuming high school chemistry teacher discovers he has cancer, he decides to team up with a former student to secure his family's future by manufacturing crystal meth.",
      imdbRating: '9.0',
      duration: '58 min',
    });

    const episode2 = episodeRepo.create({
      title: "Cat's in the Bag...",
      season: 1,
      episode: 2,
      airDate: '2008-01-27',
      director: 'Adam Bernstein',
      writer: 'Vince Gilligan',
      synopsis:
        'Walt and Jesse attempt to dispose of the bodies and clean up the mess left by their first cook.',
      imdbRating: '8.3',
      duration: '48 min',
    });

    await episodeRepo.save([episode1, episode2]);

    // 💬 Seed Quotes
    console.log('💬 Adding quotes...');
    const quote1 = quoteRepo.create({
      quote: 'I am not in danger, Skyler. I AM the danger!',
      characterId: walter.id,
      episodeId: episode1.id,
      context: 'Walter confronts Skyler about his activities',
    });

    const quote2 = quoteRepo.create({
      quote: 'Yeah, science!',
      characterId: jesse.id,
      episodeId: episode1.id,
      context: 'Jesse celebrates a successful cook',
    });

    const quote3 = quoteRepo.create({
      quote: 'I am the one who knocks!',
      characterId: walter.id,
      context: 'Walter asserts his dominance',
    });

    const quote4 = quoteRepo.create({
      quote: 'Say my name.',
      characterId: walter.id,
      context: 'Walter demands recognition from his enemies',
    });

    const quote5 = quoteRepo.create({
      quote: 'Better Call Saul!',
      characterId: saul.id,
      context: "Saul's catchphrase",
    });

    await quoteRepo.save([quote1, quote2, quote3, quote4, quote5]);

    // 💀 Seed Deaths
    console.log('💀 Adding deaths...');
    const death1 = deathRepo.create({
      victimId: gus.id,
      killerId: walter.id,
      method: 'Pipe bomb explosion',
      circumstances:
        "Walter uses a pipe bomb attached to Hector Salamanca's wheelchair to kill Gus",
      brutalityLevel: 10,
    });

    const death2 = deathRepo.create({
      victimId: hank.id,
      killerId: walter.id,
      method: 'Gunshot',
      circumstances: "Hank is killed by Jack Welker's gang after Walter calls them",
      brutalityLevel: 8,
    });

    await deathRepo.save([death1, death2]);

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
