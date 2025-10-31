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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

// Service
import { EpisodesService } from './episodes.service';

// Deto's
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { QueryEpisodeDto } from './dto/query-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@ApiTags('episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all episodes' })
  @ApiResponse({ status: 200, description: 'Returns all episodes' })
  findAll(@Query() query: QueryEpisodeDto) {
    return this.episodesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an episode by ID' })
  @ApiResponse({ status: 200, description: 'Returns the episode' })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.episodesService.findOne(id);
  }

  @Get('season/:season/episode/:episode')
  @ApiOperation({ summary: 'Get episode by season and episode number' })
  @ApiParam({ name: 'season', example: 1 })
  @ApiParam({ name: 'episode', example: 1 })
  @ApiResponse({ status: 200, description: 'Returns the episode' })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  findBySeasonAndEpisode(
    @Param('season', ParseIntPipe) season: number,
    @Param('episode', ParseIntPipe) episode: number,
  ) {
    return this.episodesService.findBySeasonAndEpisode(season, episode);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new episode' })
  @ApiResponse({ status: 201, description: 'Episode created successfully' })
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an episode' })
  @ApiResponse({ status: 200, description: 'Episode updated successfully' })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(id, updateEpisodeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an episode' })
  @ApiResponse({ status: 204, description: 'Episode deleted successfully' })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.episodesService.remove(id);
  }
}
