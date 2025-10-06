import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CategoriesService } from './category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() data: { slug: string; translations: { languageCode: string; name: string }[] }) {
    return this.categoriesService.create(data);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.categoriesService.findAll(lang);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }
}
