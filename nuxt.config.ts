export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxthub/core",
    '@nuxt/devtools',
    '@peterbud/nuxt-query',
    "@onmax/nuxt-better-auth",
  ],

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "notivue", name: "push", as: "$toast" }
    ]
  },

  auth: {
    redirects: { login: '/login', guest: '/' },
    serverConfig: './configs/auth.server',
    clientConfig: './configs/auth.client',
    hubSecondaryStorage: true
  },

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  ui: { colorMode: false },

  compatibilityDate: "2026-02-25",

  hub: {
    kv: true,
    blob: true,
    db: {
      dialect: 'sqlite',
      driver: 'd1',
      applyMigrationsDuringBuild: false
    }
  },

  eslint: { config: { stylistic: true, standalone: false } },

  nuxtQuery: { autoImports: true, devtools: false },

  nitro: {
    preset: "cloudflare_module",
    cloudflare: { deployConfig: true, nodeCompat: true },
    experimental: { tasks: true, openAPI: true }
  },

  experimental: { typedPages: true },

  vite: { optimizeDeps: { exclude: ['@tanstack/vue-query-devtools'] } },

  runtimeConfig: {
    adminEmail: process.env.ADMIN_EMAIl,
    adminPass: process.env.ADMIN_PASS,
    betterAuthSecret: '',
  },

  routeRules: {
    '/articles/**': { ssr: false, static: true },
    "/admin/**": { ssr: false, static: true },
    '/cdn/**': { ssr: false }
  },

  image: { quality: 80, format: ['webp'], provider: "none" },

  $production: {
    image: { provider: "cloudflare" }
  }
})