<script setup lang="ts">
const { posts } = useFetchArticles(false)
</script>

<template>
  <Page
    contain
    show-hero
    title="Articles"
    description="Read some of our latest articles and blog posts"
  >
    <UBlogPosts :posts="posts" />
  </Page>
</template>
