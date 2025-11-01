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
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QueryQuoteDto } from './dto/query-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  @ApiResponse({ status: 200, description: 'Returns all quotes' })
  findAll(@Query() query: QueryQuoteDto) {
    return this.quotesService.findAll(query);
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random quote' })
  @ApiResponse({ status: 200, description: 'Returns a random quote' })
  findRandom() {
    return this.quotesService.findRandom();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  @ApiResponse({ status: 200, description: 'Returns the quote' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  @ApiResponse({ status: 201, description: 'Quote created successfully' })
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quote' })
  @ApiResponse({ status: 200, description: 'Quote updated successfully' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a quote' })
  @ApiResponse({ status: 204, description: 'Quote deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.remove(id);
  }
}
