import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { posts } from './post'
import { users } from './user'

export const comments = pgTable('comments', {
  id: serial().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  postId: integer()
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  parentCommentId: integer(),
  content: text().notNull(),
  depth: integer().default(0).notNull(),
  commentsCount: integer().default(0).notNull(),
  upvotes: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
