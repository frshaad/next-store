import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { posts } from './post'
import { commentUpvotes } from './upvote'
import { users } from './user'

const comments = pgTable('comments', {
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

const commentRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  parentComment: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.id],
    relationName: 'childComments',
  }),
  childComments: many(comments, {
    relationName: 'childComments',
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  commentUpvotes: many(commentUpvotes),
}))

export { comments, commentRelations }
