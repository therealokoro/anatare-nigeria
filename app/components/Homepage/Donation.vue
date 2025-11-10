<script setup lang="ts">
</script>

<template>
  <UPageCTA
    variant="solid"
    title="Help Us Reach More Lives"
    description="Your support enables us to expand our programs and reach more vulnerable communities. Every contribution makes a tangible difference."
    :ui="{ root: 'rounded-none' }"
  >
    <template #links>
      <UButton size="xl" to="/join-us">Support Our Mission</UButton>
    </template>
  </UPageCTA>
</template>
