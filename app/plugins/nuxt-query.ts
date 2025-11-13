// plugins/nuxt-query.ts
import { QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.hook('nuxt-query:configure', (getPluginOptions) => {
      const clientOptions = useRuntimeConfig().public.nuxtQuery?.queryClientOptions || {}

      const queryClient = new QueryClient({
        ...clientOptions,
        defaultOptions: {
          queries: {
            // throwOnError(error) {
            //   // Create a Nuxt error object
            //   throw createError({
            //     statusText: error.name,
            //     statusMessage: error.message,
            //     message: error.message,
            //     data: error, // Pass the original error for debugging
            //   });
            // },
          },
          mutations: {
            onError: (error) => {
              console.error('Global Mutation Error:', error);
              // throw createError({ statusCode: 500, statusMessage: 'Server Error' });
            },
          },
        },
      })

      // return the plugin options which will be used
      // by the module at startup
      getPluginOptions(queryClient)
    })
  },
})
