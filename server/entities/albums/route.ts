import { kebabCase } from 'string-ts'
import { implement, ORPCError } from "@orpc/server"
import { contract, MAX_IMAGE_LENGTH } from "./contract"
import { ensureBlob, blob } from '@nuxthub/blob'
import { albums } from '@nuxthub/db/schema'
import { db } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import { nanoid } from "nanoid"

async function uploadImages(files: File[], slug: string): Promise<string[]> {
  if (!files.length) return []

  const uploads = await Promise.all(
    files.map(async (file) => {
      ensureBlob(file as Blob, { maxSize: '1MB', types: ['image'] })
      const blobObj = await blob.put(nanoid(), file as Blob, {
        addRandomSuffix: true,
        prefix: `albums/${slug}`,
      })
      return blobObj.pathname
    })
  )

  return uploads
}

async function deleteImages(images: string[]): Promise<void> {
  await Promise.all(images.map((img) => blob.del(img)))
}

const os = implement(contract)

const create = os.create.handler(async ({ input, errors }) => {
  const albumExist = await db.query.albums.findFirst({ where: eq(albums.title, input.title) })
  if (albumExist) throw errors.CONFLICT()

  if (input.images.length > MAX_IMAGE_LENGTH) throw errors.MAX_IMAGE_LENGTH()

  const slug = kebabCase(input.title)
  const images = await uploadImages(input.images, slug)
  if (!images.length) throw errors.NO_IMAGE()

  const [album] = await db.insert(albums).values({ slug, images, title: input.title }).returning()
  return album!
})

const deleteSingle = os.deleteSingle.handler(async ({ input, errors }) => {
  const album = await db.query.albums.findFirst({ where: eq(albums.id, input.id) })
  if (!album) throw errors.NOT_FOUND()

  await deleteImages(album.images as string[]).catch((error) => {
    throw new ORPCError('INTERNAL_SERVER_ERROR', { message: error.message })
  })

  const [deleted] = await db.delete(albums).where(eq(albums.id, input.id)).returning()
  return deleted!
})

const update = os.update.handler(async ({ input, errors }) => {
  const [albumExist, currentAlbum] = await Promise.all([
    db.query.albums.findFirst({ where: eq(albums.title, input.title) }),
    db.query.albums.findFirst({ where: eq(albums.id, input.id) }),
  ])

  if (!currentAlbum) throw errors.NOT_FOUND()
  if (albumExist && input.id !== albumExist.id) throw errors.CONFLICT()
  if (currentAlbum.images.length + input.images.length > MAX_IMAGE_LENGTH) throw errors.MAX_IMAGE_LENGTH()

  const slug = kebabCase(input.title)
  const newImages = await uploadImages(input.images, slug)
  const prevImages = (currentAlbum.images as string[]) ?? []

  const retained = input.removed?.length
    ? prevImages.filter((img) => !input.removed!.includes(img))
    : prevImages

  if (input.removed?.length) {
    await deleteImages(input.removed)
  }

  const finalImages = [...newImages, ...retained]
  if (!finalImages.length) throw errors.NO_IMAGE()

  const [album] = await db
    .update(albums)
    .set({ title: input.title, slug, images: finalImages })
    .where(eq(albums.id, input.id))
    .returning()

  return album!
})

const list = os.list.handler(async () => await db.select().from(albums))

const findById = os.findById.handler(async ({ input, errors }) => {
  const album = await db.query.albums.findFirst({ where: eq(albums.id, input.id) })
  if (!album) throw errors.NOT_FOUND()
  return album
})

const findBySlug = os.findBySlug.handler(async ({ input, errors }) => {
  const album = await db.query.albums.findFirst({ where: eq(albums.slug, input.slug) })
  if (!album) throw errors.NOT_FOUND()
  return album
})

export const albumsRouter = os.router({
  list,
  create,
  update,
  findById,
  findBySlug,
  deleteSingle,
})