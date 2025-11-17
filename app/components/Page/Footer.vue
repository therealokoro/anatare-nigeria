<script setup lang="ts">
import type { FooterColumn } from "@nuxt/ui"

const config = useAppConfig()
const route = useRoute()

const menuLinks = computed<FooterColumn[]>(() => {
  const list = [...config.navItems, { label: "Administrative", to: "/login" }]
  return list.map(i => ({ ...i, active: route.path.startsWith(i.to) }))
})
</script>

<template>
  <UFooter :ui="{ root: 'bg-neutral-800 text-white h-auto', container: 'min-h-[100px]' }">
    <template #left>
      <p class="text-sm text-current">
        &copy; {{ new Date().getFullYear() }} ACHEI. All rights reserved.
      </p>
    </template>

    <UNavigationMenu
      :ui="{
        list: 'justify-center flex-wrap',
        link: 'text-xs text-current hover:text-primary'
      }"
      :items="menuLinks"
      variant="link"
    />

    <template #right>
      <nuxt-link
        v-for="i in config.info.socialLinks"
        :to="i.link"
        class="text-current hover:text-primary"
      >
        <Icon
          :name="i.icon"
          class="size-5"
          :aria-label="i.label"
        />
      </nuxt-link>
    </template>
  </UFooter>
</template>
