// https://nuxt.com/docs/api/configuration/nuxt-config
import { env } from './shared/utils/env';

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxthub/core",
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
  nitro: { experimental: { tasks: true } },
  experimental: { typedPages: true },

  runtimeConfig: {
    adminEmail: env.ADMIN_EMAIl,
    adminPass: env.ADMIN_PASS,  
    public: { siteUrl: env.NUXT_PUBLIC_APP_URL }
  },

  routeRules: { "/admin/**": { ssr: false, static: true } },

  image: {
    quality: 80,
    format: ['webp','jpeg'],
    provider: 'ipx',
    providers: {
      blob: {
        name: 'local-ipx',
        provider: '~/lib/img-provider.ts',
        options: {
          baseURL: '/cdn/images'
        }
      }
    }
  },

  $development: { image: { provider: "local-ipx" } }
})