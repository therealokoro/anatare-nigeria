<script setup lang="ts">
import { type } from 'arktype'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { HTMLAttributes } from 'vue'
import { MAX_IMAGE_LENGTH } from '~~/server/entities/albums/contract';

const props = defineProps<{
  initial?: { title?: string, images?: File[] }
  mode: "Create" | "Edit",
  class?: HTMLAttributes['class']
}>()

const btnIsLoading = defineModel("loading", { default: false })
const reset = defineModel("reset", { default: false })
const emit = defineEmits(['submit'])

const MAX_FILES = MAX_IMAGE_LENGTH
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = type({ title: 'string', images: 'File[]'}).narrow((data, ctx) => {
  // Check title length
  if (!data.title) {
    return ctx.reject({ message: 'Title is required.', path: ['title'] })
  }

  if (props.mode == 'Create' && data.images.length === 0) {
    return ctx.reject({ message: `Please upload atleast one image`, path: ['images'] })
  }

  if (data.images.length > MAX_FILES) {
    return ctx.reject({ message: `You can only upload up to ${MAX_FILES} images.`, path: ['images'] })
  }
  
  // Check each file size
  const oversizedFile = data.images.find(file => file.size > MAX_FILE_SIZE)
  if (oversizedFile) {
    return ctx.reject({ message: "Each image must be smaller than 1MB.", path: ['images'] })
  }
  
  // Check file types
  const invalidFile = data.images.find(file => !ACCEPTED_IMAGE_TYPES.includes(file.type))
  if (invalidFile) {
    return ctx.reject({ message: 'Please upload valid image files (JPEG, PNG, or WebP).', path: ['images'] })
  }
  
  return true
})

type Schema = typeof schema.infer
const state = ref<Partial<Schema>>({ title: undefined, images: [], ...props.initial })

watch(reset, () => {
  if(reset.value) {
    state.value = { title: undefined, images: [] }
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}

const rootStyles = tv({ base: 'space-y-4 p-5' })
</script>

<template>
  <UForm :schema :state :class="rootStyles({ class: props.class })" @submit="onSubmit">
    <UFormField 
      name="title" 
      label="Album Title" 
      help="A simple title for the album"
    >
      <UInput v-model="state.title" placeholder="Enter a title for your album" />
    </UFormField>

    <UFormField 
      name="images" 
      label="Upload Images" 
      :help="`Select up to ${MAX_FILES} images. JPG, PNG or WebP (max. 1MB each).`"
    >
      <UFileUpload
        multiple
        position="inside"
        layout="list"
        accept="image/*"
        class="min-h-60"
        v-model="state.images" 
        description="PNG, JPG or JPEG (max. 1MB)"
      />
    </UFormField>

    <UButton :loading="btnIsLoading" type="submit" :label="`${mode} Album`" block />
  </UForm>
</template>