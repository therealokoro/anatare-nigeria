import { os } from "@orpc/server"
import { articlesRouter } from "../entities/articles/route"


export const orpcRouter = {
  healthCheck: os.handler(() => "API Working"),
  articles: articlesRouter
}