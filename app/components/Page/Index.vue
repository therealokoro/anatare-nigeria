<script lang="ts" setup>
import type { QueryStatus } from '@tanstack/vue-query';

const props = defineProps<{
  title?: string
  description?: string
  showHero?: boolean
  contain?: boolean
  contentClass?: string
  status?: QueryStatus
  error?: { name: string; message: string } | null
}>()

const slots = defineSlots<{
  default(): any
  hero(): any
}>()

// Use computed to ensure reactivity and prevent hydration issues
const seoTitle = computed(() => props.title)
const seoDescription = computed(() => props.description)

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  twitterTitle: seoTitle,
  ogImage: "/cover.webp",
  ogDescription: seoDescription,
  twitterDescription: seoDescription
})

const styles = tv({ base: "", variants: { hasHero: { true: 'mt-10' } } })
const hasHeroSlot = computed(() => Boolean(slots.hero))
</script>

<template>
  <UPage class="relative w-full flex flex-col pb-20">
    <template v-if="status === 'error' && error">
      <UError
        :error="{
          statusCode: 404,
          statusMessage: error.name,
          message: error.message
        }"
      />
    </template>

    <template v-else>
      <slot name="hero">
        <section
          v-if="showHero"
          class="relative w-full h-[200px] md:h-[300px]"
        >
          <UPageSection :title :description />
          <UContainer>
            <USeparator />
          </UContainer>
        </section>
      </slot>

      <UContainer v-if="contain" :class="styles({ class: contentClass, hasHero: hasHeroSlot })">
        <slot />
      </UContainer>

      <main v-else class="w-full flex-1" :class="styles({ class: contentClass, hasHero: hasHeroSlot })">
        <slot />
      </main>
    </template>
  </UPage>
</template>