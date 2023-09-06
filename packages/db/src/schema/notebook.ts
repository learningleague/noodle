import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { flashcardTable } from './flashcard';
import { moduleTable } from './module';

export const notebookTable = pgTable('Notebook', {
  id: uuid('id').primaryKey(),

  userId: text('userId'),
  orgId: text('orgId'),

  title: text('title').notNull(),
  icon: text('icon').default('file'),
  content: text('content').notNull(),

  moduleId: text('moduleId').references(() => moduleTable.id),

  lastEdited: timestamp('lastEdited').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const notebookTableRelations = relations(
  notebookTable,
  ({ one, many }) => ({
    module: one(moduleTable, {
      fields: [notebookTable.moduleId],
      references: [moduleTable.id],
    }),
    flashcards: many(flashcardTable),
  }),
);
