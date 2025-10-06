import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  providers: [RegionService],
  controllers: [RegionController],
})
export class RegionModule implements OnApplicationBootstrap {
  constructor(private readonly regionService: RegionService) {}

  async onApplicationBootstrap() {
    await this.regionService.seed();
  }
}
