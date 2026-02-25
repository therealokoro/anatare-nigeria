import { kebabCase } from 'string-ts'
import { implement, ORPCError } from "@orpc/server"
import { contract } from "./contract"
import { ensureBlob, blob } from '@nuxthub/blob'
import { articles } from '@nuxthub/db/schema'
import { db } from '@nuxthub/db'
import { desc, ne, eq } from 'drizzle-orm'
import type { BlobObject } from '@nuxthub/core/blob'

async function uploadImage(file: File): Promise<BlobObject> {
  ensureBlob(file, { maxSize: '1MB', types: ['image'] })
  return await blob.put(file.name, file, {
    addRandomSuffix: true,
    prefix: 'articles',
  }).catch((error) => {
    throw new ORPCError('PAYLOAD_TOO_LARGE', { message: error.message })
  })
}

const os = implement(contract)

const list = os.list.handler(async ({ input }) =>
  db.select().from(articles)
    .orderBy(desc(articles.date))
    .limit(input.limit ?? 10)
)

const create = os.create.handler(async ({ input, errors }) => {
  const articleExist = await db.query.articles.findFirst({ where: eq(articles.title, input.title) })
  if (articleExist) throw errors.CONFLICT()

  if (!input.coverImg?.size) throw errors.NO_IMAGE()

  const { pathname } = await uploadImage(input.coverImg)

  const [article] = await db.insert(articles).values({
    ...input,
    slug: kebabCase(input.title),
    coverImgUrl: pathname,
  }).returning()

  return article!
})

const update = os.update.handler(async ({ input, errors }) => {
  const [articleExist, currentArticle] = await Promise.all([
    db.query.articles.findFirst({ where: eq(articles.title, input.body.title) }),
    db.query.articles.findFirst({ where: eq(articles.id, input.query.id) }),
  ])

  if (!currentArticle) throw errors.NOT_FOUND()
  if (articleExist && input.query.id !== articleExist.id) throw errors.CONFLICT()

  const coverImgUrl = input.body.coverImg
    ? (await uploadImage(input.body.coverImg)).pathname
    : undefined

  const [article] = await db.update(articles).set({
    ...input.body,
    slug: kebabCase(input.body.title),
    ...(coverImgUrl && { coverImgUrl }),
  }).where(eq(articles.id, input.query.id)).returning()

  return article!
})

const findById = os.findById.handler(async ({ input, errors }) => {
  const article = await db.query.articles.findFirst({ where: eq(articles.id, input.id) })
  if (!article) throw errors.NOT_FOUND()
  return article
})

const findBySlug = os.findBySlug.handler(async ({ input, errors }) => {
  const [article, relatedArticles] = await Promise.all([
    db.query.articles.findFirst({ where: eq(articles.slug, input.slug) }),
    db.query.articles.findMany({
      where: ne(articles.slug, input.slug),
      limit: 3,
      orderBy: desc(articles.date),
    }),
  ])

  if (!article) throw errors.NOT_FOUND()

  const related = relatedArticles.map((curr) => ({
    title: curr.title,
    description: curr.description,
    date: curr.date,
    slug: curr.slug,
    author: [{ name: curr.author }],
    image: `/cdn/${curr.coverImgUrl}`,
    to: `/articles/${curr.slug}`,
  }))

  return { article, related }
})

const deleteSingle = os.deleteSingle.handler(async ({ input, errors }) => {
  const article = await db.query.articles.findFirst({ where: eq(articles.id, input.id) })
  if (!article) throw errors.NOT_FOUND()

  await Promise.all([
    blob.del(article.coverImgUrl),
    db.delete(articles).where(eq(articles.id, input.id)),
  ])
})

export const articlesRouter = os.router({
  create,
  update,
  list,
  findById,
  findBySlug,
  deleteSingle,
})