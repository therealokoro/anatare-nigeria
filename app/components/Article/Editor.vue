<script lang="ts" setup>
  import '~/assets/css/quill.css';
  import { QuillEditor } from "@vueup/vue-quill"

  const toolbar = [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline"],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["blockquote", { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"]
  ]

  const value = defineModel<string>()
</script>

<template>
  <ClientOnly>
    <div class="w-full article-editor">
      <QuillEditor
        v-model:content="value"
        placeholder="Write your article content here..."
        content-type="html"
        theme="snow"
        :toolbar
      />
    </div>
  </ClientOnly>
</template>
