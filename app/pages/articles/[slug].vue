<script lang="ts" setup>
const slug = useRoute("articles-slug").params.slug
const { data, error, status, suspense } = useFetchArticleBySlug(slug)
await suspense()

const article = computed(() => data.value?.article)
const readMoreList = computed(() => data.value?.related ?? [])

const headline = computed(() => {
  if (!article.value) return ''
  return `${formatDate(article.value.date)}, By ${article.value.author}`
})

// Pass SEO data as props to Page component
const pageTitle = computed(() => article.value?.title)
const pageDescription = computed(() => article.value?.description)
</script>

<template>
  <Page 
    contain 
    :status 
    :error
    :title="pageTitle"
    :description="pageDescription"
  >
    <template v-if="article">
      <UPageSection
        :headline
        :title="article.title"
        :description="article.description"
        :ui="{
          headline: 'text-sm',
          description: 'text-sm sm:text-base',
          title: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold'
        }"
      />

      <USeparator />

      <div class="flex-center my-10">
        <NuxtImg
          :src="article.coverImgUrl"
          :alt="article.title"
          width="500"
          height="350"
          class="rounded-lg object-cover w-full h-auto"
          placeholder
        />
      </div>

      <div class="prose mx-auto prose-green max-w-[80ch]">
        <div class="first-letter:text-5xl first-letter:font-bold" v-html="article.content" />
      </div>

      <UPageSection
        v-if="readMoreList.length"
        title="Related Articles"
        :ui="{ title: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold' }"
      >
        <UBlogPosts :posts="readMoreList" />
      </UPageSection>
    </template>
  </Page>
</template>