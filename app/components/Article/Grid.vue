<script setup lang="ts">
type Props = {
  isAdmin?: boolean;
  limit?: number
}

const props = defineProps<Props>()

const { data, isLoading } = useFetchArticles(props.isAdmin, props.limit)
const posts = computed(() => data.value || [])

const emptyDesc = computed(() => {
  return props.isAdmin ? "You have not created any article yet."
    : "It looks like there isn't any new to read about now. Come back soon!"
})
</script>

<template>
  <div class="w-full">
    <UPageGrid v-if="isLoading">
      <USkeleton v-for="i in 3" class="w-full h-[300px]" />
    </UPageGrid>

    <UBlogPosts v-else-if="posts.length" :posts="posts" />

    <UEmpty
      v-else
      icon="lucide:newspaper"
      title="No articles found"
      :description="emptyDesc"
      :size="isAdmin ? 'md' : 'xl'"
      :variant="isAdmin ? 'outline' : 'naked'"
    />
  </div>
</template>
