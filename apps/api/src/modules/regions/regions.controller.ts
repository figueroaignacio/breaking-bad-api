import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegionService } from './regions.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body('name') name: string, @Body('slug') slug: string) {
    return this.regionService.create(name, slug);
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }
}
