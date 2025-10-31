// Nest
import { Injectable, NotFoundException } from '@nestjs/common';

// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Dto's
import { CreateCharacterDto } from './dto/create-character.dto';
import { QueryCharacterDto } from './dto/query-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

// Entities
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  async findAll(query: QueryCharacterDto) {
    const { category, limit = 50, offset = 0, search, status } = query;

    const queryBuilder = this.characterRepo.createQueryBuilder('character');

    if (status) {
      queryBuilder.andWhere('character.status = :status', { status });
    }

    if (category) {
      queryBuilder.andWhere('character.category = :category', { category });
    }

    if (search) {
      queryBuilder.andWhere('(character.name ILIKE :search OR character.nickname ILIKE :search)', {
        search: `%${search}%`,
      });
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
    const character = await this.characterRepo.findOne({
      where: { id },
      relations: [
        'quotes',
        'quotes.episode',
        'deathsAsVictim',
        'deathsAsVictim.killer',
        'deathsAsVictim.episode',
      ],
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    return character;
  }

  async findRandom() {
    const count = await this.characterRepo.count();
    if (count === 0) {
      throw new NotFoundException('No characters found');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const [character] = await this.characterRepo.find({
      take: 1,
      skip: randomIndex,
    });

    return character;
  }

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepo.create(createCharacterDto);
    return await this.characterRepo.save(character);
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);
    Object.assign(character, updateCharacterDto);
    return await this.characterRepo.save(character);
  }

  async remove(id: number) {
    const character = await this.findOne(id);
    await this.characterRepo.remove(character);
    return { message: 'Character deleted successfully', character };
  }
}
