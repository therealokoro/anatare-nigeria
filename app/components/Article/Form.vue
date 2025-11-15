<script lang="ts" setup>
const props = defineProps<{
  mode: "Edit" | "Create"
  initial: {
    title?: string,
    author?: string,
    content?: string,
    description?: string
  }
}>()

const emit = defineEmits(['submit'])
const btnIsLoading = defineModel("loading", { default: false })

const errorMessages = {
  title: 'Please provide a name',
  author: 'Please provide at least one author',
  content: 'Please provide some content for the article',
  description: 'Please provide a description'
}

const createSchema = wrapType({
  title: 'string',
  author: 'string',
  content: 'string',
  description: 'string',
  coverImg: "File"
}, {...errorMessages, coverImg: "Please upload an image for the article cover"})

const editSchema = wrapType(createSchema).omit("coverImg").and({ 'coverImg': "File | null" })

const schema = computed(() => props.mode == 'Create' ? createSchema : editSchema)

const state = reactive({
  title: props.initial.title,
  author: props.initial.author,
  content: props.initial.content,
  coverImg: null as unknown as File,
  description: props.initial.description
})

async function onSubmit(event: any) { emit("submit", event.data) }

</script>

<template>
  <UForm :schema :state class="grid grid-cols-1 md:grid-cols-5 gap-3" @submit="onSubmit">
    <div class="md:col-span-3">
      <UFormField label="Content" name="content">
        <ArticleEditor v-model="state.content" />
      </UFormField>
    </div>

    <div class="md:col-span-2 space-y-4">
      <UFormField label="Title" name="title" help="This is the title of the article">
        <UInput id="title" v-model="state.title" placeholder="Enter a title for the article" />
      </UFormField>
      <UFormField label="Description" name="description" help="A short paragraph that describes the article">
        <UInput id="description" v-model="state.description" placeholder="Enter a description for the article" />
      </UFormField>
      <UFormField label="Author" name="author" help="This is visible to the public">
        <UInput id="author" v-model="state.author" placeholder="Enter the name of the article's author" />
      </UFormField>
      <UFormField label="Cover Image" name="coverImg" help="Upload an image">
        <UFileUpload
          position="inside"
          layout="list"
          v-model="state.coverImg"
          label="Drop your images here"
          accept="image/*"
          icon="i-lucide-image"
          description="PNG, WEBP, JPG or JPEG (max. 1MB)"
          class="w-full"
        />
      </UFormField>
      
      <UButton :loading="btnIsLoading" type="submit" block>{{ mode }} Article</UButton>
    </div>
  </UForm>
</template>
