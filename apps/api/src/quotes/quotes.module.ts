// Nest
import { Module } from '@nestjs/common';

// ORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller & Service
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

// Entity
import { Quote } from './entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
