<script setup lang="ts">
import VueEasyLightbox, { useEasyLightbox } from "vue-easy-lightbox"

type Album = { 
  id: string
  title: string
  images: string[]
}

const { data } = useFetchAlbumImages()
const albums = computed(() => data.value)

// Reactive state for current album
const currentAlbumImages = ref<string[]>([])
const currentAlbumTitle = ref('')

// Lightbox composable
const { show, onHide, visibleRef, indexRef } = useEasyLightbox({ 
  imgs: currentAlbumImages.value, 
  initIndex: 0 
})

// Function to open lightbox with specific album
function openLightbox(album: Album, startIndex: number = 0) {
  currentAlbumImages.value = album.images
  currentAlbumTitle.value = album.title
  indexRef.value = startIndex
  show()
}
</script>

<template>
  <Page
    contain
    show-hero
    title="Gallery"
    description="View pictures from our programs, outreach and field work"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="album in albums"
        :key="album.id"
        class="group w-full"
      >
        <!-- 2x2 Image Grid -->
        <div class="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 bg-gray-200 dark:bg-gray-800">
          <button
            v-for="(image, index) in album.images.slice(0, 4)"
            :key="index"
            @click="openLightbox(album, index)"
            class="relative overflow-hidden aspect-square outline-0 focus:ring-2 focus:ring-primary-500 focus:z-20 transition-all"
          >
            <NuxtImg 
              :src="image" 
              :alt="`${album.title} - Image ${index + 1}`"
              class="album-image group-hover:scale-105 transition-transform duration-500" 
            />
            
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
            </div>
          </button>
        </div>

        <!-- Album Title Below Grid -->
        <div class="mt-3 px-1 text-center">
          <h3 class="text-gray-900 dark:text-white font-semibold line-clamp-2">
            {{ album.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {{ album.images.length }} {{ album.images.length === 1 ? 'photo' : 'photos' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <ClientOnly>
      <vue-easy-lightbox
        teleport="body"
        :visible="visibleRef"
        :imgs="currentAlbumImages"
        :index="indexRef"
        :rotate-disabled="false"
        :move-disabled="false"
        @hide="onHide"
      >
        <!-- Custom title slot if supported -->
        <template #toolbar>
          <div class="vel-custom-toolbar">
            <span class="text-sm opacity-80">{{ currentAlbumTitle }}</span>
            <span class="text-sm opacity-80 ml-4">{{ currentAlbumImages.length }} Images</span>
          </div>
        </template>
      </vue-easy-lightbox>
    </ClientOnly>
  </Page>
</template>

<style lang="css">
@reference "~/assets/css/main.css";

/* Lightbox theming */
.vel-modal { 
  @apply bg-black/95 backdrop-blur-sm!; 
}

/* Custom caption inside lightbox */
.vel-img-title {
  @apply text-base md:text-lg font-semibold text-white bg-black/60 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm;
}

/* Custom toolbar styling */
.vel-custom-toolbar {
  @apply absolute top-4 left-4 text-white z-50 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm;
}

/* Album image styling */
.album-image {
  @apply h-full w-full object-cover;
}

/* Smooth grid animations */
@media (prefers-reduced-motion: no-preference) {
  .group:hover .album-image {
    animation: subtle-zoom 0.5s ease-out forwards;
  }
}
</style>