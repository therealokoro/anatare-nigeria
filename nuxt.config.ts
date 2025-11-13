// https://nuxt.com/docs/api/configuration/nuxt-config
// import { env } from './shared/utils/env';

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxthub/core",
    '@nuxt/devtools',
    '@peterbud/nuxt-query'
  ],

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "notivue", name: "push", as: "$toast" }
    ]
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ui: { colorMode: false },
  compatibilityDate: "latest",
  hub: { kv: true, database: true, blob: true },
  eslint: { config: { stylistic: true, standalone: false } },
  nuxtQuery: { autoImports: true, devtools: false },
  nitro: { experimental: { tasks: true, openAPI: true } },
  experimental: { typedPages: true },

  vite: { optimizeDeps: { exclude: ['@tanstack/vue-query-devtools'] } },

  runtimeConfig: {
    adminEmail: process.env.ADMIN_EMAIl,
    adminPass: process.env.ADMIN_PASS,  
    public: { siteUrl: process.env.NUXT_PUBLIC_APP_URL }
  },

  routeRules: {
    '/articles/**': { ssr: false, static: true },
    "/admin/**": {ssr: false, static: true },
    '/cdn/**': { ssr: false } },

  image: {
    quality: 80,
    format: ['webp'],
    domains: ['localhost:3000'],
    alias: {
      cdn: 'http://localhost:3000/cdn',
    },
  },
})