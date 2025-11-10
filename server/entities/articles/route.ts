import { kebabCase } from 'string-ts'
import { implement, ORPCError } from "@orpc/server"
import { contract } from "./contract"
import { articles } from "~~/server/database/schema"
import { BlobObject } from '@nuxthub/core'
import { desc, ne } from 'drizzle-orm'
import { useDB } from '../../utils/db'

// upload utility function
async function handleUploadImage(file: File){
  try {
    ensureBlob(file, { maxSize: '1MB', types: ['image'] })
    return await hubBlob().put(file.name, file, {
      addRandomSuffix: true,
      prefix: 'articles'
    })
  } catch (error: any) {
    throw new ORPCError('PAYLOAD_TOO_LARGE', { message: error.message })
  }
}

const os = implement(contract)

// list out all articles
const list = os.list.handler(async ({ input }) => {
  
  return await useDB().select().from(articles)
    .orderBy(desc(articles.date))
    .limit(input.limit || 10)
})

// Creates a single article
const create = os.create.handler(async ({ input, errors }) => {
  const articleExist = await useDB().query.articles.findFirst({ where: eq(articles.title, input.title) })

  if(articleExist){ throw errors.CONFLICT() }

  if (!input.coverImg || !input.coverImg.size) { throw errors.NO_IMAGE() }

  const uploadedImageFile = await handleUploadImage(input.coverImg)

  const article = await useDB().insert(articles).values({
    ...input,
    slug: kebabCase(input.title),
    coverImgUrl: uploadedImageFile.pathname
  }).returning()

  return article[0]
})

// Update a single article
const update = os.update.handler(async ({ input, errors }) => {
  const articleExist = await useDB().query.articles.findFirst({
    where: eq(articles.title, input.body.title)
  })

  if(articleExist && input.query.id != articleExist?.id) { throw errors.CONFLICT() }

  let uploadedImageFile: BlobObject | null = null

  if(input.body.coverImg){
    const file = input.body.coverImg as File
    uploadedImageFile = await handleUploadImage(file)
  }

  const article = await useDB().update(articles).set({
    ...input.body,
    slug: kebabCase(input.body.title),
    ...(uploadedImageFile && {coverImgUrl: uploadedImageFile.pathname})
  }).where(eq(articles.id, input.query.id)).returning()

  return article[0]
})

// Fetch a single article
const findById = os.findById.handler(async ({ input, errors }) => {
  const article = await useDB().query.articles.findFirst({ where: eq(articles.id, input.id) })
  if(!article){ throw errors.NOT_FOUND() }
  return article
})

// Fetch a single article
const findBySlug = os.findBySlug.handler(async ({ input, errors }) => {
  const db = useDB()

  // Find the main article
  const article = await db.query.articles.findFirst({ where: eq(articles.slug, input.slug) })

  if (!article) { throw errors.NOT_FOUND() }

  // Find 3 other articles (excluding the current one)
  const related = await db.query.articles.findMany({
    where: ne(articles.slug, input.slug),
    limit: 3,
    orderBy: desc(articles.date)
  })

  return { article, related }
})


const deleteSingle = os.deleteSingle.handler(async ({ input, errors }) => {
  const article = await useDB().query.articles.findFirst({ where: eq(articles.id, input.id) })
  if(!article){ throw errors.NOT_FOUND() }
  await useDB().delete(articles).where(eq(articles.id, input.id))
})

export const articlesRouter = os.router({
  create,
  update,
  list,
  findById,
  findBySlug,
  deleteSingle
})
