<script setup lang="ts">
const { data } = useFetchAlbumImages()
const imageList = computed(() => {
  const list: { title: string; src: string }[] = []
  data.value?.forEach(curr => {
    list.push(...curr.images.map(c => ({ title: curr.title, src: c })))
  })

  return list
})
</script>

<template>
  <UPageSection title="From Our Gallery">
    <UMarquee pause-on-hover :ui="{ root: '[--duration:100s] [--gap:--spacing(10)]' }">
      <div
        v-for="item in imageList"
        :key="item.src"
        class="relative size-[150px] md:size-[250px] rounded-lg overflow-hidden shrink-0"
      >
        <NuxtImg
          :src="item.src"
          :alt="item.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </UMarquee>
  </UPageSection>
</template>
