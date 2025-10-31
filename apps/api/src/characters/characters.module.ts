// Nest
import { Module } from '@nestjs/common';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller & Service
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

// Entity
import { Character } from './entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
