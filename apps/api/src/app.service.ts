import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getEndpoints(req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/api`;

    return {
      name: 'Breaking Bad API',
      version: '1.0.0',
      description: 'RESTful API for Breaking Bad universe data',
      documentation: `${protocol}://${host}/docs`,
      endpoints: {
        characters: {
          getAll: `GET ${baseUrl}/characters`,
          getOne: `GET ${baseUrl}/characters/:id`,
          getRandom: `GET ${baseUrl}/characters/random`,
          create: `POST ${baseUrl}/characters`,
          update: `PATCH ${baseUrl}/characters/:id`,
          delete: `DELETE ${baseUrl}/characters/:id`,
        },
        episodes: {
          getAll: `GET ${baseUrl}/episodes`,
          getOne: `GET ${baseUrl}/episodes/:id`,
          getBySeasonEpisode: `GET ${baseUrl}/episodes/season/:season/episode/:episode`,
          create: `POST ${baseUrl}/episodes`,
          update: `PATCH ${baseUrl}/episodes/:id`,
          delete: `DELETE ${baseUrl}/episodes/:id`,
        },
        quotes: {
          getAll: `GET ${baseUrl}/quotes`,
          getOne: `GET ${baseUrl}/quotes/:id`,
          getRandom: `GET ${baseUrl}/quotes/random`,
          create: `POST ${baseUrl}/quotes`,
          update: `PATCH ${baseUrl}/quotes/:id`,
          delete: `DELETE ${baseUrl}/quotes/:id`,
        },
        deaths: {
          getAll: `GET ${baseUrl}/deaths`,
          getOne: `GET ${baseUrl}/deaths/:id`,
          create: `POST ${baseUrl}/deaths`,
          update: `PATCH ${baseUrl}/deaths/:id`,
          delete: `DELETE ${baseUrl}/deaths/:id`,
        },
      },
      links: {
        documentation: `${protocol}://${host}/docs`,
        repository: 'https://github.com/figueroaignacio/breaking-bad-api',
      },
    };
  }
}
