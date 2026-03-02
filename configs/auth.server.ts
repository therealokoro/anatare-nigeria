import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  emailAndPassword: { enabled: true },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare specific header example
    },
  },
})
