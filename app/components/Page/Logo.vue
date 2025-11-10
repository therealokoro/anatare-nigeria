<script lang="ts" setup>
defineProps<{ compact?: boolean }>()
</script>

<template>
  <div class="flex items-center gap-2 w-max p-2">
    <img
      src="/logos/anatare-hand.png"
      format="webp"
      width="45"
      alt="ACHEI Logo"
    >

    <div>
      <p class="font-extrabold text-brand-primary-500 md:text-xl">ACHEI</p>
      <p v-if="!compact" class="text-xs text-secondary-500">
        <span>Anatare Community <br> Health and Enpowerment Initiative</span>
      </p>
    </div>
  </div>
</template>
