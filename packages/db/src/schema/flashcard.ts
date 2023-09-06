import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { moduleTable } from './module';
import { notebookTable } from './notebook';

export const flashcardTable = pgTable('Flashcard', {
  id: uuid('id').primaryKey(),

  userId: text('userId'),
  orgId: text('orgId'),

  question: text('question').notNull(),
  answer: text('answer').notNull(),

  lastAttempted: timestamp('lastAttempted'),
  lastAttemptCorrect: boolean('lastAttemptCorrect'),

  createdAt: timestamp('createdAt').defaultNow().notNull(),

  notebookId: text('notebookId').references(() => notebookTable.id),
  moduleId: text('moduleId').references(() => moduleTable.id),
});

export const flashcardTableRelations = relations(flashcardTable, ({ one }) => ({
  module: one(moduleTable, {
    fields: [flashcardTable.moduleId],
    references: [moduleTable.id],
  }),
  notebook: one(notebookTable, {
    fields: [flashcardTable.notebookId],
    references: [notebookTable.id],
  }),
}));
