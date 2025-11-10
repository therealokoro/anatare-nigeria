<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
const color = ''
const config = useAppConfig()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'description', content: config.site.description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})

useSeoMeta({
  titleTemplate: `%s | ${config.site.name}`,
  description: config.site.description,
  ogImage: '/cover.webp',
  twitterImage: '/cover.webp',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp :toaster="{ position: 'top-center' }">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <VueQueryDevtools />
  </UApp>
</template>
