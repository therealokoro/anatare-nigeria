import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from 'drizzle-arktype';
import { nanoid } from "nanoid"
import { sql } from "drizzle-orm"

export const albums = sqliteTable("albums", {
  id: text().primaryKey().$default(() => nanoid()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  images: text('images', { mode: 'json' })
    .notNull()
    .$type<string[]>() // Infer type as array of strings
    .default(sql`(json_array())`),
  date: integer({ mode: "timestamp_ms" }).$default(() => new Date()).notNull()
});

export const AlbumSchema = createSelectSchema(albums)

export const CreateAlbumSchema = createInsertSchema(albums).omit("slug")