import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        // Generate a random salt
        const salt = crypto.getRandomValues(new Uint8Array(16))
        const saltHex = Buffer.from(salt).toString("hex")

        // Combine salt + password and hash with SHA-256
        const encoder = new TextEncoder()
        const data = encoder.encode(saltHex + password)
        const hash = await crypto.subtle.digest("SHA-256", data)
        const hashHex = Buffer.from(hash).toString("hex")

        // Store as salt:hash so we can verify later
        return `${saltHex}:${hashHex}`
      },
      verify: async ({ password, hash }) => {
        // Split out the salt and re-hash to compare
        const [saltHex, hashHex] = hash.split(":")
        const encoder = new TextEncoder()
        const data = encoder.encode(saltHex + password)
        const newHash = await crypto.subtle.digest("SHA-256", data)
        const newHashHex = Buffer.from(newHash).toString("hex")

        return newHashHex === hashHex
      }
    }
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
    trustedProxies: ["127.0.0.1", "::1"]
  },
})
