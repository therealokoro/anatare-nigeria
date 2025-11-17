import { oc } from "@orpc/contract"
import { AlbumSchema, CreateAlbumSchema } from "~~/server/database/schema/albums"

export const MAX_IMAGE_LENGTH = 15

export const contract = {
  create: oc.input(CreateAlbumSchema.pick("title").and({ images: "File[]" }))
    .output(AlbumSchema)
    .errors({
      MAX_IMAGE_LENGTH: { message: `You can have only ${MAX_IMAGE_LENGTH} images for each album` },
      CONFLICT: { message: "An album already exists with this name" },
      NO_IMAGE: { message: "Album must contain atleast one image"}
    }),

  deleteSingle: oc.input(AlbumSchema.pick("id"))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),

  update: oc.input(CreateAlbumSchema.pick("title")
    .and({ id: 'string', images: "File[]", removed: 'string[]' }))
    .output(AlbumSchema)
    .errors({
      MAX_IMAGE_LENGTH: { message: `You can have only ${MAX_IMAGE_LENGTH} images for each album` },
      NOT_FOUND: { message: "The album you're looking for was not found" },
      CONFLICT: { message: "An album already exists with this name" },
      NO_IMAGE: { message: "Album must contain atleast one image"}
    }),

  list: oc.output(AlbumSchema.array()),

  findById: oc.input(AlbumSchema.pick("id"))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),

  findBySlug: oc.input(AlbumSchema.pick("slug"))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),
}
