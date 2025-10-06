import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { categories, legends, legendTranslations, regions } from 'src/db/schema';

@Injectable()
export class LegendService {
  async create(data: {
    slug: string;
    regionSlug: string;
    categorySlug?: string;
    translations: { languageCode: string; name: string; description: string }[];
  }) {
    const region = await db.query.regions.findFirst({
      where: eq(regions.slug, data.regionSlug),
    });
    if (!region) throw new NotFoundException(`Region ${data.regionSlug} not found`);

    let categoryId: number | undefined = undefined;
    if (data.categorySlug) {
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, data.categorySlug),
      });
      if (!category) throw new NotFoundException(`Category ${data.categorySlug} not found`);
      categoryId = category.id;
    }

    const [legend] = await db
      .insert(legends)
      .values({
        slug: data.slug,
        regionId: region.id,
        categoryId,
      })
      .returning();

    await db.insert(legendTranslations).values(
      data.translations.map((t) => ({
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
      return await db.query.legends.findMany({
        with: {
          translations: language ? { where: eq(legendTranslations.languageCode, language) } : true,
          region: true,
          category: true,
        },
      });
    } catch (error) {
      console.error('Error fetching legends:', error);
      throw new InternalServerErrorException('Failed to fetch legends');
    }
  }

  async findOne(id: number, language?: string) {
    const legend = await db.query.legends.findFirst({
      where: eq(legends.id, id),
      with: {
        translations: language ? { where: eq(legendTranslations.languageCode, language) } : true,
        region: true,
        category: true,
      },
    });

    if (!legend) throw new NotFoundException(`Legend with id ${id} not found`);
    return legend;
  }
}
