import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  emailAndPassword: { enabled: true },
  // rateLimit: { enabled: false },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
    trustedProxies: ["127.0.0.1", "::1"]
  },
})
