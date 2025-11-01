// Decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

// Dto's
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QueryQuoteDto } from './dto/query-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepo: Repository<Quote>,
  ) {}

  async findAll(query: QueryQuoteDto) {
    const { characterId, limit = 50, offset = 0 } = query;

    const queryBuilder = this.quoteRepo
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.character', 'character')
      .leftJoinAndSelect('quote.episode', 'episode');

    if (characterId) {
      queryBuilder.andWhere('quote.characterId = :characterId', { characterId });
    }

    const [data, total] = await queryBuilder.take(limit).skip(offset).getManyAndCount();

    return {
      data,
      meta: {
        total,
        limit,
        offset,
      },
    };
  }

  async findOne(id: number) {
    const quote = await this.quoteRepo.findOne({
      where: { id },
      relations: ['character', 'episode'],
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return quote;
  }

  async findRandom() {
    const count = await this.quoteRepo.count();
    if (count === 0) {
      throw new NotFoundException('No quotes found');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const quotes = await this.quoteRepo.find({
      skip: randomIndex,
      take: 1,
      relations: ['character', 'episode'],
    });

    return quotes[0];
  }

  async create(createQuoteDto: CreateQuoteDto) {
    const quote = this.quoteRepo.create(createQuoteDto);
    const saved = await this.quoteRepo.save(quote);
    return await this.findOne(saved.id);
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.findOne(id);
    Object.assign(quote, updateQuoteDto);
    await this.quoteRepo.save(quote);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const quote = await this.findOne(id);
    await this.quoteRepo.remove(quote);
    return { message: 'Quote deleted successfully', quote };
  }
}
