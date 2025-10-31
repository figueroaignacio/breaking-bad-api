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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// Service
import { CharactersService } from './characters.service';

// Dto's
import { CreateCharacterDto } from './dto/create-character.dto';
import { QueryCharacterDto } from './dto/query-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiResponse({ status: 200, description: 'Returns all characters' })
  findAll(@Query() query: QueryCharacterDto) {
    return this.charactersService.findAll(query);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random character' })
  @ApiResponse({ status: 200, description: 'Returns a random character' })
  findRandom() {
    return this.charactersService.findRandom();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiResponse({ status: 200, description: 'Returns the character' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new character' })
  @ApiResponse({ status: 201, description: 'Character created successfully' })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a character' })
  @ApiResponse({ status: 200, description: 'Character updated successfully' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a character' })
  @ApiResponse({ status: 204, description: 'Character deleted successfully' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.remove(id);
  }
}
