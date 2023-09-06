import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { moduleTable } from './module';

export const assignmentTable = pgTable('Assignment', {
  id: uuid('id').primaryKey(),

  userId: text('userId'),
  orgId: text('orgId'),

  name: text('name').notNull(),
  weight: integer('weight').notNull(),
  grade: integer('grade'),

  dueDate: timestamp('dueDate'),
  reminder: timestamp('reminder'),

  submissionLink: text('submissionLink'),
  attachments: text('attachments'),

  createdAt: timestamp('createdAt').defaultNow().notNull(),

  moduleId: text('moduleId').references(() => moduleTable.id),
});

export const assignmentTableRelations = relations(
  assignmentTable,
  ({ one }) => ({
    module: one(moduleTable, {
      fields: [assignmentTable.moduleId],
      references: [moduleTable.id],
    }),
  }),
);
