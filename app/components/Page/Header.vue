<script setup lang="ts">
const config = useAppConfig()
const items = useActiveRouteLink(config.navItems)
</script>

<template>
  <UHeader title="ACHEI" mode="slideover" class="[--ui-header-height:100px]">
    <template #title>
      <PageLogo />
    </template>

    <UNavigationMenu :ui="{ link: 'text-xs' }" :items="items" variant="link" />

    <template #right>
      <UButton to="/join-us" class="hidden lg:block" size="lg">Join Us Today</UButton>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
