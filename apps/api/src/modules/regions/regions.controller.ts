import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { RegionService } from './regions.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(
    @Body()
    data: {
      slug: string;
      translations: { languageCode: string; name: string; slug: string }[];
    },
  ) {
    return this.regionService.create(data.slug, data.translations);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.regionService.findAll(lang);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }
}
