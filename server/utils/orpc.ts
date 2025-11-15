import { os } from "@orpc/server"
import { articlesRouter } from "../entities/articles/route"
import { albumsRouter } from "../entities/albums/route"

export const orpcRouter = os.router({
  healthCheck: os.handler(() => "API Working"),
  articles: articlesRouter,
  albums: albumsRouter
})