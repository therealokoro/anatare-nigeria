// drizzle/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from 'drizzle-arktype';
import { nanoid } from "nanoid"
import { type } from "arktype"

export const articles = sqliteTable("articles", {
  id: text().primaryKey().$default(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  author: text('author').notNull(),
  coverImgUrl: text('coverImageUrl').notNull(),
  date: integer({ mode: "timestamp_ms" }).$default(() => new Date()).notNull()
});

export const ArticleSchema = createSelectSchema(articles)

export const CreateArticleSchema = createInsertSchema(articles, {
  slug: (s) => s.optional(),
}).omit('coverImgUrl').and({ coverImg: type("File") })

export const UpdateArticleSchema = CreateArticleSchema.omit("coverImg", "date", "id", "slug").and({
  "coverImg": "File|null"
})

export type IArticle = typeof ArticleSchema.infer