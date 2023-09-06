import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { moduleTable } from './module';

export const priorityEnum = pgEnum('Priority', ['Important', 'Medium', 'Low']);

export const taskTable = pgTable('Task', {
  id: uuid('id').primaryKey(),

  userId: text('userId'),
  orgId: text('orgId'),

  task: text('task').notNull(),
  description: text('description'),
  attachments: text('attachments'),
  priority: priorityEnum('priority'),
  completed: boolean('completed').default(false),

  dueDate: timestamp('dueDate'),
  repeat: boolean('repeat').default(false),
  repeatInterval: text('repeatInterval'),

  createdAt: timestamp('createdAt').defaultNow().notNull(),

  moduleId: text('moduleId').references(() => moduleTable.id),
});

export const taskTableRelations = relations(taskTable, ({ one }) => ({
  module: one(moduleTable, {
    fields: [taskTable.moduleId],
    references: [moduleTable.id],
  }),
}));
