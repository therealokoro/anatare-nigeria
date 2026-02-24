import { kebabCase } from 'string-ts'
import { implement, ORPCError } from "@orpc/server"
import { contract, MAX_IMAGE_LENGTH } from "./contract"
import { albums } from "~~/server/database/schema"
import { useDB } from '../../utils/db'
import { nanoid } from "nanoid"

// upload utility function
async function handleUploadImage(files: File[], slug: string){
  if(!files.length) return []

  const pathList: string[] = []

  try {
    for (let i = 0; i < files.length; i++) {
      const img = files[i];
      ensureBlob(img, { maxSize: '1MB', types: ['image'] })
      const blobObj = await hubBlob().put(nanoid(), img, {
        addRandomSuffix: true,
        prefix: `albums/${slug}`
      })
      pathList.push(blobObj.pathname)
    }
    
    return pathList
  } catch (error: any) {
    throw new ORPCError('PAYLOAD_TOO_LARGE', { message: error.message })
  }
}

const os = implement(contract)

// Creates a single album
const create = os.create.handler(async ({ input, errors }) => {
  const albumExist = await useDB().query.albums.findFirst({ where: eq(albums.title, input.title) })

  if(albumExist){ throw errors.CONFLICT() }
  
  const { title } = input
  const slug = kebabCase(title)

  if(input.images.length > MAX_IMAGE_LENGTH){ throw errors.MAX_IMAGE_LENGTH() }

  const images = await handleUploadImage(input.images, slug)
  if(!images.length){ throw errors.NO_IMAGE() }

  const album = await useDB().insert(albums).values({ slug, images, title }).returning()

  return album[0]
})

// delete a single album
const deleteSingle = os.deleteSingle.handler(async ({ input, errors }) => {
  const album = await useDB().query.albums.findFirst({ where: eq(albums.id, input.id) })
  if(!album){ throw errors.NOT_FOUND() }

  try {
    // delete album images first
    for (let i = 0; i < album.images.length; i++) {
      const img = album.images[i];
      await hubBlob().del(img)
    }
  } catch (error: any) {
    throw new ORPCError('INTERNAL_SERVER_ERROR', { message: error.message })
  }
  
  const deleted = await useDB().delete(albums).where(eq(albums.id, input.id)).returning()
  return deleted[0]
})

// Creates a single album
const update = os.update.handler(async ({ input, errors }) => {
  // Check if album exists
  const albumExist = await useDB().query.albums.findFirst({ where: eq(albums.title, input.title)})
  if(albumExist && input.id != albumExist?.id) { throw errors.CONFLICT() }

  // Get the current album being updated
  const currentAlbum = await useDB().query.albums.findFirst({ where: eq(albums.id, input.id) })
  if(!currentAlbum) { throw errors.NOT_FOUND() }

  const { title, removed } = input
  const slug = kebabCase(title)

  if(currentAlbum.images.length + input.images.length > MAX_IMAGE_LENGTH){ throw errors.MAX_IMAGE_LENGTH() }

  // upload new images
  let uploadedImgs = await handleUploadImage(input.images, slug)
  // store old images
  const prevImgList = currentAlbum.images || []

  // if remove list isn't empty, delete images in the list
  if(removed && removed.length){
    for (let i = 0; i < removed.length; i++) {
      const img = removed[i];
      await hubBlob().delete(img)
    }
    const newImgList = prevImgList.filter(curr => !removed.includes(curr))
    uploadedImgs = [...uploadedImgs, ...newImgList]
  } else {
    // Keep existing images if no removals
    uploadedImgs = [...uploadedImgs, ...prevImgList]
  }

  if(!uploadedImgs.length){ throw errors.NO_IMAGE() }

  const album = await useDB().update(albums).set({
    title,
    slug,
    images: uploadedImgs
  }).where(eq(albums.id, input.id)).returning()

  return album[0]
})

// List all albums
const list = os.list.handler(async () => await useDB().select().from(albums))

// Fetch a single album
const findById = os.findById.handler(async ({ input, errors }) => {
  const album = await useDB().query.albums.findFirst({ where: eq(albums.id, input.id) })
  if(!album){ throw errors.NOT_FOUND() }
  return album
})

// Fetch a single album
const findBySlug = os.findBySlug.handler(async ({ input, errors }) => {
  const album = await useDB().query.albums.findFirst({ where: eq(albums.slug, input.slug) })
  if(!album){ throw errors.NOT_FOUND() }
  return album
})

export const albumsRouter = os.router({
  list,
  create,
  update,
  findById,
  findBySlug,
  deleteSingle
})
