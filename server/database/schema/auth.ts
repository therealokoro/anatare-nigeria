import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { nanoid } from "nanoid"

export const user = sqliteTable("user", {
  id: text().primaryKey().$default(() => nanoid()),

  name: text().notNull(),
  email: text().unique().notNull(),
  emailVerified: integer({ mode: "boolean" }).default(false),
  image: text(),

  role: text(),
  banned: integer({ mode: "boolean" }),
  banReason: text(),
  banExpires: integer({ mode: "timestamp_ms" }),

  createdAt: integer({ mode: "timestamp_ms" }).$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date())
})

export const session = sqliteTable("session", {
  id: text().primaryKey().$default(() => nanoid()),
  userId: text().references(() => user.id, { onDelete: "cascade" }).notNull(),
  token: text().notNull(),
  expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
  ipAddress: text(),
  userAgent: text(),

  impersonatedBy: text(),

  createdAt: integer({ mode: "timestamp_ms" }).$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date())
})

export const account = sqliteTable("account", {
  id: text().primaryKey().$default(() => nanoid()),
  userId: text().references(() => user.id, { onDelete: "cascade" }).notNull(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: integer({ mode: "timestamp_ms" }),
  refreshTokenExpiresAt: integer({ mode: "timestamp_ms" }),
  scope: text(),
  idToken: text(),
  password: text(),

  expiresAt: integer({ mode: "timestamp_ms" }),
  createdAt: integer({ mode: "timestamp_ms" }).$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date())
})

export const verification = sqliteTable("verification", {
  id: text().primaryKey().$default(() => nanoid()),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: "timestamp_ms" }).notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).$default(() => new Date()),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date())
})
