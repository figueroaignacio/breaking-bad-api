import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const regions = pgTable('regions', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const legends = pgTable('legends', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  regionId: integer('region_id')
    .notNull()
    .references(() => regions.id, { onDelete: 'restrict' }),
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

export const regionsRelations = relations(regions, ({ many }) => ({
  legends: many(legends),
}));

export const legendsRelations = relations(legends, ({ many }) => ({
  translations: many(legendTranslations),
}));

export const legendTranslationsRelations = relations(legendTranslations, ({ one }) => ({
  legend: one(legends, {
    fields: [legendTranslations.legendId],
    references: [legends.id],
  }),
}));
