import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { RegionController } from './regions.controller';
import { RegionService } from './regions.service';

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
