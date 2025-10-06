import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { regions } from 'src/db/schema';
import { DEFAULT_REGIONS } from 'src/lib/constants';

@Injectable()
export class RegionService {
  async create(name: string, slug: string) {
    try {
      const [region] = await db.insert(regions).values({ name, slug }).returning();
      return region;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create region');
    }
  }

  async findAll() {
    try {
      return await db.query.regions.findMany();
    } catch (err) {
      throw new InternalServerErrorException('Failed to fetch regions');
    }
  }

  async findOne(id: number) {
    const region = await db.query.regions.findFirst({
      where: eq(regions.id, id),
    });

    if (!region) throw new NotFoundException(`Region with id ${id} not found`);
    return region;
  }

  async seed() {
    try {
      const existing = await db.query.regions.findMany();
      if (existing.length > 0) return existing;

      const inserted = await db.insert(regions).values(DEFAULT_REGIONS).returning();

      return inserted;
    } catch (error) {
      console.error('Failed to seed regions', error);
      throw new InternalServerErrorException('Failed to seed regions');
    }
  }
}
