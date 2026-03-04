export default defineEventHandler((event) => {
  // Only protect the task runner endpoint
  if (!event.path.startsWith("/_nitro/tasks")) return

  const config = useRuntimeConfig()
  const authHeader = getHeader(event, "Authorization")

  if (!authHeader || authHeader !== `Bearer ${config.seedSecret}`) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }
})