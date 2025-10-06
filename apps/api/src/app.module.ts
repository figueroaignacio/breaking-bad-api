import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { LegendModule } from './modules/legend/legend.module';
import { RegionModule } from './modules/regions/regions.module';

@Module({
  imports: [
    LegendModule,
    AdminModule,
    RegionModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
