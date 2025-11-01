// Nest
import { Module } from '@nestjs/common';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller & Service
import { DeathsController } from './deaths.controller';
import { DeathsService } from './deaths.service';

// Entity
import { Death } from './entities/death.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Death])],
  controllers: [DeathsController],
  providers: [DeathsService],
  exports: [DeathsService],
})
export class DeathsModule {}
