import { oc } from "@orpc/contract"
import { type } from 'arktype';
import { ArticleSchema, CreateArticleSchema, UpdateArticleSchema } from "~~/server/db/schema/articles"

const OutputArticleSchema = ArticleSchema.omit("content", "id", "coverImgUrl", "author").and({
  to: "string",
  image: "string",
  author: type({ name: 'string' }).array()
})

export const contract = {
  create: oc.input(CreateArticleSchema)
    .output(ArticleSchema)
    .errors({
      CONFLICT: { message: "An article already exists with this name" },
      NO_IMAGE: { message: "No image file was uploaded" }
    }),

  update: oc.route({ inputStructure: 'detailed' })
    .input(type({
      query: type({ id: "string" }),
      body: UpdateArticleSchema
    }))
    .output(ArticleSchema)
    .errors({
      CONFLICT: { message: "An article already exists with this name" },
      NO_IMAGE: { message: "No image file was uploaded" },
      NOT_FOUND: { message: "The article you're looking for was not found" }
    }),

  list: oc.input(type({ "limit?": "number" }))
    .output(ArticleSchema.array()),

  findById: oc
    .input(ArticleSchema.pick("id"))
    .output(ArticleSchema)
    .errors({
      NOT_FOUND: { message: "The article you're looking for was not found" },
    }),

  findBySlug: oc
    .input(ArticleSchema.pick("slug"))
    .output(type({
      article: ArticleSchema,
      related: OutputArticleSchema.array()
    }))
    .errors({
      NOT_FOUND: { message: "The article you're looking for was not found" },
    }),

  deleteSingle: oc
    .input(ArticleSchema.pick("id"))
    .errors({
      NOT_FOUND: { message: "The article you're looking for was not found" },
    }),
}
