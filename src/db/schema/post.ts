import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { comments } from './comment'
import { postUpvotes } from './upvote'
import { users } from './user'

const posts = pgTable('posts', {
  id: serial().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text().notNull(),
  url: text(),
  content: text(),
  slug: text().notNull().unique(),
  points: integer().default(0).notNull(),
  commentCount: integer().default(0).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  postUpvotes: many(postUpvotes),
}))

export { posts, postRelations }
