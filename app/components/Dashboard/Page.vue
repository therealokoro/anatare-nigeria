<script lang="ts" setup>
import type { QueryStatus } from '@tanstack/vue-query';

const { title, description, error } = defineProps<{
  title?: string
  description?: string
  contentClass?: string
  status?: QueryStatus
  error?: { name: string; message: string } | null
}>()

useSeoMeta({ title, description })

</script>

<template>
  <UPage class="relative w-full flex flex-col pb-20">
    <UContainer>
      <div v-if="status == 'pending'" class="flex-center min-h-[300px]">
        <div class="loader" />
      </div>
      
      <UError
        v-else-if="status == 'error' && error"
        :ui="{ root: 'min-h-[300px]' }"
        redirect="/admin"
        :error="{
          statusMessage: error?.name,
          message: error?.message
        }"
      />

      <div v-else :class="contentClass">
        <slot />
      </div>
    </UContainer>
  </UPage>
</template>


<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}
</style>
