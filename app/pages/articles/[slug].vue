<script lang="ts" setup>
const route = useRoute("articles-slug")
const { data, error, suspense } = useFetchArticleBySlug(route.params.slug)

await suspense()

if(error.value){ throw createError(error.value) }

const article = computed(() => data.value?.article)
const readMoreList = computed(() => data.value?.related.map(curr => ({
  ...curr,
  image: curr.coverImgUrl,
  to: `/articles/${curr.slug}`
})))

const meta = computed(() => {
  if (!article.value) return ''
  return `${formatDate(article.value.date)}, By ${article.value.author}`
})
</script>

<template>
  <Page
    :title="article?.title"
    :description="article?.description"
    contain
  >
    <UPageSection
      :headline="meta"
      :title="article?.title"
      :description="article?.description"
      :ui="{
        headline: 'text-sm',
        description: 'text-sm sm:text-base',
        title: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold'
      }"
    />

    <USeparator />

    <!-- Article Image -->
    <div class="flex-center mt-10">
      <NuxtImg
        :src="article?.coverImgUrl"
        :alt="article?.title"
        format="webp"
        width="500"
        height="350"
        class="rounded-lg object-cover w-full h-auto"
        placeholder
      />
    </div>

    <!-- Article Content -->
    <div class="prose mx-auto prose-green max-w-[80ch]">
      <div class="first-letter:text-5xl first-letter:font-bold" v-html="article?.content" />
    </div>

    <UPageSection
      title="Related Articles"
      :ui="{ title: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold' }"
    >
      <UBlogPosts :posts="readMoreList" />
    </UPageSection>
  </Page>
</template>
