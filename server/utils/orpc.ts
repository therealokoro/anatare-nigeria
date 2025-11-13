import { os } from "@orpc/server"
import { articlesRouter } from "../entities/articles/route"

export const orpcRouter = os.router({
  healthCheck: os.handler(() => "API Working"),
  articles: articlesRouter
})