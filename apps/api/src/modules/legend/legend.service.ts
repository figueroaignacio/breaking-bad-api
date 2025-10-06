import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { legends, legendTranslations, regions } from 'src/db/schema';

@Injectable()
export class LegendService {
  async create(data: any) {
    const region = await db.query.regions.findFirst({
      where: eq(regions.slug, data.regionSlug),
    });

    if (!region) throw new NotFoundException(`Region ${data.regionSlug} not found`);

    const [legend] = await db
      .insert(legends)
      .values({
        slug: data.slug,
        regionId: region.id,
        imageUrl: data.imageUrl,
      })
      .returning();

    await db.insert(legendTranslations).values(
      data.translations.map((t: any) => ({
        legendId: legend.id,
        languageCode: t.languageCode,
        name: t.name,
        description: t.description,
      })),
    );

    return legend;
  }

  async findAll(language?: string) {
    try {
      const all = await db.query.legends.findMany({
        with: {
          translations: language ? { where: eq(legendTranslations.languageCode, language) } : true,
        },
      });

      return all;
    } catch (error) {
      console.error('Detailed error in findAll:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw new InternalServerErrorException('Failed to fetch legends');
    }
  }
}
