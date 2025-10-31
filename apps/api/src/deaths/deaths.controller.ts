import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeathsService } from './deaths.service';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';

@Controller('deaths')
export class DeathsController {
  constructor(private readonly deathsService: DeathsService) {}

  @Post()
  create(@Body() createDeathDto: CreateDeathDto) {
    return this.deathsService.create(createDeathDto);
  }

  @Get()
  findAll() {
    return this.deathsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeathDto: UpdateDeathDto) {
    return this.deathsService.update(+id, updateDeathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathsService.remove(+id);
  }
}
