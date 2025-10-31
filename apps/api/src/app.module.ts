// Nest
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { ConfigModule } from '@nestjs/config';
import { CharactersModule } from './characters/characters.module';
import { DatabaseModule } from './db/db.module';
import { DeathsModule } from './deaths/deaths.module';
import { EpisodesModule } from './episodes/episodes.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CharactersModule,
    QuotesModule,
    DeathsModule,
    EpisodesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
