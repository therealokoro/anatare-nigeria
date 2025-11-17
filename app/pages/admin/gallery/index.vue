<script lang="ts" setup>
const { data, error, status, suspense } = useFetchAlbums(true)
await suspense()
const albums = computed(() => data.value || [])
</script>

<template>
  <DashboardPage title="Gallery" :status :error>
    <UButton to="/admin/gallery/new" label="Create New Album" icon="lucide:plus" class="mb-5" />

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
