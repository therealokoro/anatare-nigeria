<script lang="ts" setup>
const { data, error, status, suspense } = useFetchAlbums(true)
await suspense()

const albums = computed(() => data.value || [])
const { mutateAsync: createAlbum, isPending } = useCreateAlbum()

const albumModal = ref(false)
async function triggerCreateAlbum(data: any){
  await createAlbum(data)
  albumModal.value = false
}
</script>

<template>
  <DashboardPage title="Gallery" :status :error>
    <UModal v-model:open="albumModal" title="Create an Album" scrollable :ui="{ content: 'w-[calc(100vw-2rem)] max-w-xl' }">
      <UButton label="Create New Album" icon="lucide:plus" class="mb-5" />

      <template #content>
        <AlbumForm v-model:loading="isPending" mode="Create" @submit="triggerCreateAlbum($event)" />
      </template>
    </UModal>

    <UPageGrid v-if="status == 'pending'">
      <USkeleton v-for="i in 3" class="w-full h-[300px]" />
    </UPageGrid>
    
    <UEmpty
      v-if="!albums?.length"
      icon="lucide:image"
      title="No Image Album Found"
      description="Looks like you haven't created any album yet"
    />

    <UPageGrid v-else>
      <UPageCard
        v-for="(item, i) in albums"
        :key="i"
        icon="lucide:image"
        v-bind="item"
      />
    </UPageGrid>
  </DashboardPage>
</template>
