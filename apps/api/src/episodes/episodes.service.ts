// Decorators
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';

// Dto's
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { QueryEpisodeDto } from './dto/query-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>,
  ) {}

  async findAll(query: QueryEpisodeDto) {
    const { limit = 50, offset = 0, season } = query;

    const queryBuilder = this.episodeRepo.createQueryBuilder('episode');

    if (season) {
      queryBuilder.andWhere('episode.season = :season', { season });
    }

    const [data, total] = await queryBuilder
      .orderBy('episode.season', 'ASC')
      .addOrderBy('episode.episode', 'ASC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();

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
    const episode = await this.episodeRepo.findOne({
      where: { id },
      relations: ['quotes', 'quotes.character', 'deaths', 'deaths.victim', 'deaths.killer'],
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return episode;
  }

  async findBySeasonAndEpisode(season: number, episode: number) {
    const result = await this.episodeRepo.findOne({
      where: { season, episode },
      relations: ['quotes', 'quotes.character'],
    });

    if (!result) {
      throw new NotFoundException(`Episode S${season}E${episode} not found`);
    }

    return result;
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = this.episodeRepo.create(createEpisodeDto);
    return await this.episodeRepo.save(episode);
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    const episode = await this.findOne(id);
    Object.assign(episode, updateEpisodeDto);
    return await this.episodeRepo.save(episode);
  }

  async remove(id: number) {
    const episode = await this.findOne(id);
    await this.episodeRepo.remove(episode);
    return { message: 'Episode deleter successfully', episode };
  }
}
