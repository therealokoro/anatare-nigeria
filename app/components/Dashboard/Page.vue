<script lang="ts" setup>
const { title, description, error } = defineProps<{
  title?: string
  description?: string
  contentClass?: string
  loading?: boolean
  error?: { name: string; message: string } | null
}>()

useSeoMeta({ title, description })

</script>

<template>
  <UPage class="relative w-full flex flex-col pb-20">
    <UContainer>
      <div v-if="loading">{{ loading }}</div>
      
      <UError
        v-if="error"
        :ui="{ root: 'min-h-[300px]' }"
        redirect="/admin"
        :error="{
          statusCode: 404,
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
