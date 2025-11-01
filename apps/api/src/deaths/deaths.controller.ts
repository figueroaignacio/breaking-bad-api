// Decorators
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Service
import { DeathsService } from './deaths.service';

// Dto's
import { CreateDeathDto } from './dto/create-death.dto';
import { QueryDeathDto } from './dto/query-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';

@ApiTags('deaths')
@Controller('deaths')
export class DeathsController {
  constructor(private readonly deathsService: DeathsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all deaths' })
  @ApiResponse({ status: 200, description: 'Returns all deaths' })
  findAll(@Query() query: QueryDeathDto) {
    return this.deathsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get death statistics' })
  @ApiResponse({ status: 200, description: 'Returns death statistics' })
  getStats() {
    return this.deathsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a death by ID' })
  @ApiResponse({ status: 200, description: 'Returns the death' })
  @ApiResponse({ status: 404, description: 'Death not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deathsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new death' })
  @ApiResponse({ status: 201, description: 'Death created successfully' })
  create(@Body() createDeathDto: CreateDeathDto) {
    return this.deathsService.create(createDeathDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a death' })
  @ApiResponse({ status: 200, description: 'Death updated successfully' })
  @ApiResponse({ status: 404, description: 'Death not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDeathDto: UpdateDeathDto) {
    return this.deathsService.update(id, updateDeathDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a death' })
  @ApiResponse({ status: 204, description: 'Death deleted successfully' })
  @ApiResponse({ status: 404, description: 'Death not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deathsService.remove(id);
  }
}
