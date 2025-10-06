import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// ------------------ REGIONS ------------------
export const regions = pgTable('regions', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const regionTranslations = pgTable('region_translations', {
  id: serial('id').primaryKey(),
  regionId: integer('region_id')
    .notNull()
    .references(() => regions.id, { onDelete: 'cascade' }),
  languageCode: text('language_code').notNull(),
  name: text('name').notNull(),
});

export const regionsRelations = relations(regions, ({ many }) => ({
  translations: many(regionTranslations),
}));

export const regionTranslationsRelations = relations(regionTranslations, ({ one }) => ({
  region: one(regions, {
    fields: [regionTranslations.regionId],
    references: [regions.id],
  }),
}));

// ------------------ CATEGORIES ------------------
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const categoryTranslations = pgTable('category_translations', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  languageCode: text('language_code').notNull(),
  name: text('name').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  translations: many(categoryTranslations),
}));

export const categoryTranslationsRelations = relations(categoryTranslations, ({ one }) => ({
  category: one(categories, {
    fields: [categoryTranslations.categoryId],
    references: [categories.id],
  }),
}));

// ------------------ LEGENDS ------------------
export const legends = pgTable('legends', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  regionId: integer('region_id')
    .notNull()
    .references(() => regions.id, { onDelete: 'restrict' }),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const legendTranslations = pgTable('legend_translations', {
  id: serial('id').primaryKey(),
  legendId: integer('legend_id')
    .notNull()
    .references(() => legends.id, { onDelete: 'cascade' }),
  languageCode: text('language_code').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const legendsRelations = relations(legends, ({ many, one }) => ({
  translations: many(legendTranslations),
  region: one(regions, {
    fields: [legends.regionId],
    references: [regions.id],
  }),
  category: one(categories, {
    fields: [legends.categoryId],
    references: [categories.id],
  }),
}));

export const legendTranslationsRelations = relations(legendTranslations, ({ one }) => ({
  legend: one(legends, {
    fields: [legendTranslations.legendId],
    references: [legends.id],
  }),
}));
