import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  emailAndPassword: { enabled: true },
  // trustedOrigins: ['http://localhost:3000', "https://anatarenigeria.org"]
})
