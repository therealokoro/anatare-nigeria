<script setup lang="ts">
import { isDefinedError } from '@orpc/client'
const id = useRoute("admin-articles-id").params.id

const { data: article, error, status } = useFetchArticleById(id)

const currErr = ref<{ message: string; name: string }|null>(null);

// initial form state
const formState = computed(() => ({
  title: article.value?.title,
  content: article.value?.content,
  author: article.value?.author,
  description: article.value?.description,
  coverImg: undefined,
}))

// ✅ Watch reactively to handle query results
watchEffect(() => {
  // Handle oRPC or network errors
  if (isDefinedError(error.value)) {
    currErr.value = {
      message: error.value.message,
      name: error.value.name
    }
  }
})

// Update Article
const updateArticle = useUpdateArticle()
function onSubmit(body: any) {
  updateArticle.mutate({ body, query: { id } })
}

// Delete article mutation
const openDeleteModal = ref(false)
const deleteArticle = useDeleteArticle()
function initDeleteArticle() {
  deleteArticle.mutate({ id })
}
</script>

<template>
  <DashboardPage title="Update Article" :error="currErr" :status>
    <UModal v-bind:open="openDeleteModal" title="Confirm Action">
      <UButton label="Delete Article" @click="openDeleteModal = true" icon="lucide:x" class="mb-5" color="error" />

      <template #body>
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2>Are you sure you want to delete this article?</h2>

          <div class="flex items-center gap-2">
            <UButton :loading="deleteArticle.isPending.value" label="Confirm" @click="initDeleteArticle" color="error" />
            <UButton label="Cancel" @click="openDeleteModal = false" variant="ghost" color="neutral" />
          </div>
        </div>
      </template>
    </UModal>
    
    <template v-if="article">
      <h1 class="text-lg font-bold mb-5">
        Fill the form below to update the article
      </h1>
      <ArticleForm mode="Edit" :initial="formState" @submit="onSubmit" />
    </template>
  </DashboardPage>
</template>
