import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LegendService } from '../legend/legend.service';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly legendService: LegendService) {}

  @Post('legends')
  createLegend(@Body() data: any) {
    return this.legendService.create(data);
  }
}
