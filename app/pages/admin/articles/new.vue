<script lang="ts" setup>
const state = reactive({
  title: undefined,
  content: undefined,
  author: "Administrator",
  description: undefined,
  coverImg: undefined
})

const addArticle = useCreateArticle() 
async function onSubmit(data: any) {
  addArticle.mutate(data)
}
</script>

<template>
  <Page title="Create Article">
    <h1 class="text-lg font-bold mb-5">Fill the form below to create an article</h1>

    <ArticleForm v-model:loading="addArticle.isPending.value" mode="Create" :initial="state" @submit="onSubmit" />
  </Page>
</template>
