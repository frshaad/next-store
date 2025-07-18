import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { comments } from './comment'
import { posts } from './post'
import { users } from './user'

const postUpvotes = pgTable('post_upvotes', {
  id: serial().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  postId: integer()
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

const postUpvoteRelations = relations(postUpvotes, ({ one }) => ({
  user: one(users, {
    fields: [postUpvotes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postUpvotes.postId],
    references: [posts.id],
    relationName: 'postUpvotes',
  }),
}))

const commentUpvotes = pgTable('comment_upvotes', {
  id: serial().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  commentId: integer()
    .notNull()
    .references(() => comments.id, { onDelete: 'cascade' }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

const commentUpvoteRelations = relations(commentUpvotes, ({ one }) => ({
  user: one(users, {
    fields: [commentUpvotes.userId],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [commentUpvotes.commentId],
    references: [comments.id],
    relationName: 'commentUpvotes',
  }),
}))

export {
  postUpvotes,
  postUpvoteRelations,
  commentUpvotes,
  commentUpvoteRelations,
}
