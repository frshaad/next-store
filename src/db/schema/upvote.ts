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

export { postUpvotes, commentUpvotes }
