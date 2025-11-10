<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
  contain?: boolean
  titleClass?: string
}>()

const titleClasses = tv({ base: "text-xl md:text-2xl text-foreground font-extrabold" })
</script>

<template>
  <section class="relative w-full h-auto">
    <div v-if="title" class="py-10 w-full flex flex-col items-center justify-center text-center">
      <h3 :class="titleClasses({ class: titleClass })">{{ title }}</h3>
      <p class="text-xs text-muted font-semibold">{{ description }}</p>
    </div>

    <UContainer v-if="contain">
      <slot />
    </UContainer>

    <div v-else>
      <slot />
    </div>
  </section>
</template>
