<script setup lang="ts">
const { posts, status } = useFetchArticles(true)
</script>

<template>
  <DashboardPage title="Articles">
    <UButton label="Create New Article" icon="lucide:plus" to="/admin/articles/new" class="mb-5" />

    <UPageGrid v-if="status == 'pending' && !posts.length">
      <USkeleton v-for="i in 3" class="w-full h-[200px]" />
    </UPageGrid>

    <UBlogPosts v-else="posts" :posts class="mt-5" />
  </DashboardPage>
</template>
