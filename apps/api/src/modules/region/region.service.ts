import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { regions, regionTranslations } from 'src/db/schema';
import { DEFAULT_REGIONS } from 'src/lib/constants';

@Injectable()
export class RegionService {
  async create(
    slug: string,
    translations: { languageCode: string; name: string; slug?: string }[],
  ) {
    try {
      const [region] = await db.insert(regions).values({ slug }).returning();

      await db.insert(regionTranslations).values(
        translations.map((t) => ({
          regionId: region.id,
          languageCode: t.languageCode,
          name: t.name,
        })),
      );

      const regionWithTranslations = await db.query.regions.findFirst({
        where: eq(regions.id, region.id),
        with: { translations: true },
      });

      return regionWithTranslations;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create region');
    }
  }

  async findAll(language?: string) {
    try {
      return await db.query.regions.findMany({
        with: {
          translations: language ? { where: eq(regionTranslations.languageCode, language) } : true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch regions');
    }
  }

  async findOne(id: number) {
    const region = await db.query.regions.findFirst({
      where: eq(regions.id, id),
      with: { translations: true },
    });

    if (!region) throw new NotFoundException(`Region with id ${id} not found`);
    return region;
  }

  async seed() {
    try {
      const existing = await db.query.regions.findMany({
        with: { translations: true },
      });
      if (existing.length > 0) return existing;

      const insertedRegions = [];

      for (const r of DEFAULT_REGIONS) {
        const [region] = await db.insert(regions).values({ slug: r.slug }).returning();

        await db.insert(regionTranslations).values(
          r.translations.map((t) => ({
            regionId: region.id,
            languageCode: t.languageCode,
            name: t.name,
          })),
        );

        const regionWithTranslations = await db.query.regions.findFirst({
          where: eq(regions.id, region.id),
          with: { translations: true },
        });

        insertedRegions.push(regionWithTranslations);
      }

      return insertedRegions;
    } catch (error) {
      console.error('Failed to seed regions', error);
      throw new InternalServerErrorException('Failed to seed regions');
    }
  }
}
