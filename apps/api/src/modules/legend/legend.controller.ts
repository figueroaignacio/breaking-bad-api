import { Controller, Get, Query } from '@nestjs/common';
import { LegendService } from './legend.service';

@Controller('legends')
export class LegendController {
  constructor(private readonly legendService: LegendService) {}

  @Get()
  async getLegends(@Query('lang') lang?: string) {
    return this.legendService.findAll(lang);
  }
}
