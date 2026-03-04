export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, "Authorization")

  if (!authHeader || authHeader !== `Bearer ${config.seedSecret}`) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  const { result } = await runTask("db:seed", {})
  return { result }
})