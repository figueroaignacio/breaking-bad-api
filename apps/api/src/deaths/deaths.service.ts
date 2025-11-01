// Decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Repository } from 'typeorm';
import { Death } from './entities/death.entity';

// Dto's
import { CreateDeathDto } from './dto/create-death.dto';
import { QueryDeathDto } from './dto/query-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';

@Injectable()
export class DeathsService {
  constructor(
    @InjectRepository(Death)
    private readonly deathRepository: Repository<Death>,
  ) {}

  async findAll(query: QueryDeathDto) {
    const { victimId, killerId, season, limit = 50, offset = 0 } = query;

    const queryBuilder = this.deathRepository
      .createQueryBuilder('death')
      .leftJoinAndSelect('death.victim', 'victim')
      .leftJoinAndSelect('death.killer', 'killer')
      .leftJoinAndSelect('death.episode', 'episode');

    if (victimId) {
      queryBuilder.andWhere('death.victimId = :victimId', { victimId });
    }

    if (killerId) {
      queryBuilder.andWhere('death.killerId = :killerId', { killerId });
    }

    if (season) {
      queryBuilder.andWhere('episode.season = :season', { season });
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
    const death = await this.deathRepository.findOne({
      where: { id },
      relations: ['victim', 'killer', 'episode'],
    });

    if (!death) {
      throw new NotFoundException(`Death with ID ${id} not found`);
    }

    return death;
  }

  async create(createDeathDto: CreateDeathDto) {
    const death = this.deathRepository.create(createDeathDto);
    const saved = await this.deathRepository.save(death);
    return await this.findOne(saved.id);
  }

  async update(id: number, updateDeathDto: UpdateDeathDto) {
    const death = await this.findOne(id);
    Object.assign(death, updateDeathDto);
    await this.deathRepository.save(death);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const death = await this.findOne(id);
    await this.deathRepository.remove(death);
    return { message: 'Death deleted successfully', death };
  }

  async getStats() {
    const total = await this.deathRepository.count();

    const byMethod = await this.deathRepository
      .createQueryBuilder('death')
      .select('death.method', 'method')
      .addSelect('COUNT(*)', 'count')
      .where('death.method IS NOT NULL')
      .groupBy('death.method')
      .getRawMany();

    const avgBrutality = await this.deathRepository
      .createQueryBuilder('death')
      .select('AVG(death.brutalityLevel)', 'average')
      .where('death.brutalityLevel IS NOT NULL')
      .getRawOne();

    return {
      total,
      byMethod,
      averageBrutalityLevel: parseFloat(avgBrutality?.average || '0').toFixed(2),
    };
  }
}
