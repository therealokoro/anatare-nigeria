import type { D1Database } from "@cloudflare/workers-types"
import type { H3Event } from "h3"
import { betterAuth } from "better-auth"
import { CamelCasePlugin, Kysely } from "kysely"
import { D1Dialect } from "kysely-d1"

let _auth: ReturnType<typeof betterAuth>
export function useServerAuth() {
  if (!_auth) {
    const db = hubDatabase() as unknown as D1Database
    _auth = betterAuth({
      database: {
        db: new Kysely({
          dialect: new D1Dialect({ database: db }),
          plugins: [new CamelCasePlugin()]
        }),
        type: "sqlite"
      },
      secondaryStorage: {
        get: key => hubKV().getItemRaw(`_auth:${key}`),
        set: (key, value, ttl) => {
          return hubKV().set(`_auth:${key}`, value, { ttl })
        },
        delete: key => hubKV().del(`_auth:${key}`)
      },
      baseURL: getBaseURL(),
      emailAndPassword: { enabled: true}
    })
  }
  return _auth
}

function getBaseURL() {
  const envBase = process.env.BETTER_AUTH_URL
  const runtimeAppUrl = (() => {
    try {
      const rc = useRuntimeConfig?.()
      return rc?.appUrl as string | undefined
    }
    catch {
      return undefined
    }
  })()

  let baseURL = envBase || runtimeAppUrl

  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch {
      // ignore
    }
  }

  return typeof baseURL === "string" ? baseURL.replace(/\/+$/, "") : baseURL
}

export async function requireAuth(event: H3Event) {
  const session = await useServerAuth().api.getSession({
    headers: event.headers
  })
  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    })
  }

  event.context.user = session.user
  return session
}
