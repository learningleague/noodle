import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { assignmentTable } from './assignment';
import { flashcardTable } from './flashcard';
import { colorsEnum } from './lib/colors';
import { notebookTable } from './notebook';

export const moduleTable = pgTable(
  'Module',
  {
    id: uuid('id').primaryKey().notNull(),

    userId: text('userId'),
    orgId: text('orgId'),

    name: text('name').notNull(),
    description: text('description'),
    icon: text('icon').default('graduation-cap'),
    color: colorsEnum('color').default('primary'),
    code: text('code').notNull(),
    credits: integer('credits').notNull().default(0),

    lastVisited: timestamp('lastVisited').defaultNow().notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (table) => ({
    userIdKey: index('Module_userId_key').on(table.userId),
    orgIdKey: index('Module_orgId_key').on(table.orgId),
    codeKey: index('Module_code_key').on(table.code),
  }),
);

export const moduleTableRelations = relations(moduleTable, ({ many }) => ({
  notebooks: many(notebookTable),
  tasks: many(notebookTable),
  flashcards: many(flashcardTable),
  assignments: many(assignmentTable),
}));

export const insertModuleSchema = createInsertSchema(moduleTable).omit({
  id: true,
  lastVisited: true,
  createdAt: true,
});
