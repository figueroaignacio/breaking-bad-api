// Nest
import { Module } from '@nestjs/common';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller & Service
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

// Entity
import { Episode } from './entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
  exports: [EpisodesService],
})
export class EpisodesModule {}
