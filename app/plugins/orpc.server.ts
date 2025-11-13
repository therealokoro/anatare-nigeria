import { createRouterClient } from '@orpc/server'
import { orpcRouter } from '~~/server/utils/orpc'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

export default defineNuxtPlugin(() => {
  const client = createRouterClient(orpcRouter, {})
  const orpc = createTanstackQueryUtils(client)
  return { provide: { orpc } }
})
