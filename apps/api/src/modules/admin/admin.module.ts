import { Module } from '@nestjs/common';
import { LegendService } from '../legend/legend.service';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  providers: [LegendService],
})
export class AdminModule {}
