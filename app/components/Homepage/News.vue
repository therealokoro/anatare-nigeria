<script setup lang="ts">
const { posts } = useFetchArticles(false)
</script>

<template>
  <UPageSection title="Blog Posts" :ui="{ container: 'mx-auto' }">
    <UBlogPosts :posts="posts" orientation="horizontal" class="sm:grid sm:grid-cols-1 lg:grid-cols-2" />
  </UPageSection>
</template>
