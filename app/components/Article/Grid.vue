<script setup lang="ts">
const props = defineProps<{ isAdmin?: boolean; limit?: number }>()
const { data, isLoading } = useFetchArticles(props.isAdmin, props.limit)
const posts = computed(() => data.value || [])
</script>

<template>
  <div class="w-full">
    <UPageGrid v-if="isLoading">
      <USkeleton v-for="i in 3" class="w-full h-[300px]" />
    </UPageGrid>

    <UBlogPosts v-else-if="posts.length" :posts="posts" />
  </div>
</template>
