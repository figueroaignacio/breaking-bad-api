// Nest
import { Module } from '@nestjs/common';

// DB
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Character } from 'src/characters/entities/character.entity';
import { Death } from 'src/deaths/entities/death.entity';
import { Episode } from 'src/episodes/entities/episode.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Character, Episode, Quote, Death],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
