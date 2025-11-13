
export const useFetchArticles = (admin: boolean, limit = 10) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.articles.list.queryOptions({
    input: { limit },
    select(data) {
      const urlPrefix = admin ? '/admin' : ''
      return data.map((curr) => ({
        title: curr.title,
        description: curr.description,
        image: "/cdn/" + curr.coverImgUrl,
        to: `${urlPrefix}/articles/${admin ? curr.id : curr.slug}`,
        author: [{ name: curr.author }]
      }))
    }
  })))
}

export const useFetchArticleById = (id: string) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.articles.findById.queryOptions({ input: { id } })))
}

export const useFetchArticleBySlug = (slug: string) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.articles.findBySlug.queryOptions({ input: { slug } })))
}

export const useCreateArticle = () => {
  const toast = useToast()
  const { $orpc } = useNuxtApp()

  return useMutation($orpc.articles.create.mutationOptions({
    onError(error) {
      toast.add({ title: 'Error', description: error.message, color: 'error' })
    },
    onSuccess(){
      toast.add({ title: 'Success', description: 'Article created and published successfully', color: 'success' })
      navigateTo("/admin/articles")
    }
  }))
}

export const useUpdateArticle = () => {
  const { $orpc } = useNuxtApp()
  const toast = useToast()

  // Update article mutation
  return useMutation($orpc.articles.update.mutationOptions({
      onError(error) {
        toast.add({ title: "Error", description: error.message, color: "error" })
      },
      onSuccess() {
        toast.add({
          title: "Success",
          description: "Article updated successfully",
          color: "success",
        })
        navigateTo("/admin/articles")
      },
    })
  )
}

export const useDeleteArticle = () => {
  const { $orpc } = useNuxtApp()
  const toast = useToast()

  // Update article mutation
  return useMutation($orpc.articles.deleteSingle.mutationOptions({
    onError(error) {
      toast.add({ title: "Error", description: error.message, color: "error" })
    },
    onSuccess() {
      toast.add({
        title: "Success",
        description: "Article was deleted successfully",
        color: "success",
      })
      navigateTo("/admin/articles")
    },
  })
)
}