<script lang="ts" setup>
const { title, description } = defineProps<{
  title?: string
  description?: string
  meta?: string
  showHero?: boolean
  contain?: boolean
  contentClass?: string
}>()

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogImage: "/cover.webp",
  twitterTitle: title,
  ogDescription: description,
  twitterDescription: description
})
</script>

<template>
  <UPage class="relative w-full flex flex-col pb-20">
    <slot name="hero">
      <section
        v-if="showHero"
        class="relative w-full h-[200px] md:h-[300px]"
      >
        <div class="flex-center flex-col">
          <UPageSection :title :description :headline="meta" />
          <!-- <p>{{ meta }}</p> -->
        </div>

        <UContainer>
          <USeparator />
        </UContainer>
      </section>
    </slot>

    <UContainer v-if="contain" :class="contentClass">
      <slot />
    </UContainer>

    <!-- Acutal Page Content -->
    <main v-else class="w-full flex-1" :class="[{ 'mt-10': $slots.hero }, contentClass]">
      <slot />
    </main>
  </UPage>
</template>
