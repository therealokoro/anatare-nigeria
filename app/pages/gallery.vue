<script setup lang="ts">
import VueEasyLightbox, { useEasyLightbox } from "vue-easy-lightbox"

const { images } = useGallery()

const { show, onHide, visibleRef, indexRef } = useEasyLightbox({ imgs: images, initIndex: 0 })
</script>

<template>
  <Page
    contain
    show-hero
    title="Gallery"
    description="View pictures from our programs, outreach and field work"
  >
    <!-- Masonry gallery -->
    <div class="columns-2 sm:columns-3 lg:columns-4 gap-5 [column-fill:_balance]">
      <div
        v-for="(image, i) in images"
        :key="i"
        class="relative mb-5 overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid"
        @click="() => show(i)"
      >
        <img
          :src="image.src"
          :alt="image.title"
          class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        >

        <!-- Gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <!-- Caption -->
        <p
          class="absolute bottom-2 left-3 right-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {{ image.title }}
        </p>
      </div>
    </div>

    <!-- Lightbox -->
    <ClientOnly>
      <vue-easy-lightbox
        teleport="body"
        :visible="visibleRef"
        :imgs="images"
        :index="indexRef"
        :rotate-disabled="true"
        :move-disabled="true"
        @hide="onHide"
      />
    </ClientOnly>
  </Page>
</template>

<style lang="css">
@reference "~/assets/css/main.css";

/* Lightbox theming */
.vel-modal { @apply !bg-black/90; }

/* Custom caption inside lightbox */
.vel-img-title {
  @apply text-base md:text-lg font-semibold text-white bg-black/60 px-3 py-2 rounded-md shadow-md;
}
</style>
