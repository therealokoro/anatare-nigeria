<script lang="ts" setup>
const { mutateAsync: createAlbum, isPending } = useCreateAlbum()

async function triggerCreateAlbum(data: any){
  await createAlbum(data)
  navigateTo("/admin/gallery")
}
</script>

<template>
  <DashboardPage title="Create New Album">
    <h1 class="text-lg font-bold mb-7">Create a Album</h1>
    <AlbumForm
      class="p-0 lg:max-w-2xl"
      mode="Create"
      v-model:loading="isPending"
      @submit="triggerCreateAlbum($event)"
    />
  </DashboardPage>
</template>
