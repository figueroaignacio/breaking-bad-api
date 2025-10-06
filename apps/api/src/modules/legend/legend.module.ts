import { Module } from '@nestjs/common';
import { LegendController } from './legend.controller';
import { LegendService } from './legend.service';

@Module({
  controllers: [LegendController],
  providers: [LegendService],
})
export class LegendModule {}
