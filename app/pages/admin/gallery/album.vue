<script setup lang="ts">
const albumId = useRoute("admin-gallery-album").query.id?.toString()
const _error = ref<{ name: string; message: string } | null>(null)

if(!albumId) {
  _error.value = {
    name: "Error",
    message: "Please select an album to view"
  }
}

const { data, error, status, suspense } = useFetchAlbumById(albumId as string)
await suspense()

const openDeleteModal = ref(false)
const album = computed(() => data.value)
const images = computed(() => data.value?.images || [])
const displayImages = ref(images.value)
const imageDeleteList = ref<string[]>([])

const { data: newAlbumInfo, mutateAsync: updateAlbum, isPending, isSuccess } = useUpdateAlbum()
const deleteMutation = useDeleteAlbum()

watch(error, (err) => {
  if(!err) return
  _error.value = { name: err?.name, message: err?.message }
})

watch(newAlbumInfo, (info) => {
  if (info?.images) {
    displayImages.value = info.images
  }
})

async function handleUpdateAlbum(data: any) {
  await updateAlbum({ id: albumId!, images: data.images, title: data.title, removed: imageDeleteList.value })
  navigateTo("/admin/gallery")
}

function deleteImage(img: string){
  displayImages.value = displayImages.value.filter(curr => curr != img)
  imageDeleteList.value.push(img)
}

async function handleDeleteAlbum() {
  deleteMutation.mutate({ id: albumId! })
}
</script>

<template>
  <DashboardPage title="Update Album" :error="_error" :status>
    <h1 class="text-lg font-bold mb-7">Create a Album</h1>
    <template v-if="album">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-bold">{{ album.title }} Album</h1>

        <UModal v-bind:open="openDeleteModal" title="Confirm Action">
          <UButton label="Delete Album" @click="openDeleteModal = true" icon="lucide:x" class="mb-5" color="error" />

          <template #body>
            <div class="flex flex-col gap-2 items-center justify-center">
              <h2>Are you sure you want to delete this album?</h2>

              <div class="flex items-center gap-2">
                <UButton :loading="deleteMutation.isPending.value" label="Confirm" @click="handleDeleteAlbum" color="error" />
                <UButton label="Cancel" @click="openDeleteModal = false" variant="ghost" color="neutral" />
              </div>
            </div>
          </template>
        </UModal>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <div class="col-span-1">
          <AlbumForm
            mode="Edit"
            class="p-0"
            :initial="{ title: album.title }"
            v-model:reset="isSuccess"
            v-model:loading="isPending"
            @submit="handleUpdateAlbum"
          />
        </div>
      
        <div class="col-span-1">
          <h1 class="text-lg font-bold">Album's Images</h1>
          <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="relative w-full h-[100px]" v-for="(item, index) in displayImages">
              <NuxtImg
                :src="`/cdn/${item}`"
                class="w-full h-full object-cover transition-transform duration-300 rounded-md border border-gray-400"
                :alt="`Album image ${index + 1}`"
              />

              <div class="absolute top-2 right-2 flex-center">
                <UButton icon="lucide:trash" variant="outline" color="neutral" @click="deleteImage(item)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DashboardPage>
</template>