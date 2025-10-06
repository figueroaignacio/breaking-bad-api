import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { categories, categoryTranslations } from 'src/db/schema';
import { DEFAULT_CATEGORIES } from 'src/lib/constants';

@Injectable()
export class CategoriesService {
  async create(data: { slug: string; translations: { languageCode: string; name: string }[] }) {
    try {
      const [category] = await db.insert(categories).values({ slug: data.slug }).returning();

      await db.insert(categoryTranslations).values(
        data.translations.map((t) => ({
          categoryId: category.id,
          languageCode: t.languageCode,
          name: t.name,
        })),
      );

      return category;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(language?: string) {
    try {
      const all = await db.query.categories.findMany({
        with: {
          translations: language
            ? { where: eq(categoryTranslations.languageCode, language) }
            : true,
        },
      });
      return all;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async findOne(id: number) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
      with: {
        translations: true,
      },
    });

    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async seed() {
    try {
      const existing = await db.query.categories.findMany();
      if (existing.length > 0) return existing;

      const insertedCategories = [];

      for (const cat of DEFAULT_CATEGORIES) {
        const [category] = await db.insert(categories).values({ slug: cat.slug }).returning();

        await db.insert(categoryTranslations).values(
          cat.translations.map((t) => ({
            categoryId: category.id,
            languageCode: t.languageCode,
            name: t.name,
          })),
        );

        insertedCategories.push(category);
      }

      return insertedCategories;
    } catch (error) {
      console.error('Failed to seed categories', error);
      throw new InternalServerErrorException('Failed to seed categories');
    }
  }
}
