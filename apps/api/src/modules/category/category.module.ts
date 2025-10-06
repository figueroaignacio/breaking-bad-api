import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoryModule {
  constructor(private readonly categoryService: CategoriesService) {}

  async onApplicationBootstrap() {
    await this.categoryService.seed();
  }
}
