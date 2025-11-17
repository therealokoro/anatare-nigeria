export const useCreateAlbum = () => {  
  const toast = useToast()
  const { $orpc } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation(computed(() => {
    return $orpc.albums.create.mutationOptions({
      onError(error) {
        toast.add({ title: 'Error', description: error.message, color: 'error' })
      },
      onSuccess(){
        toast.add({ title: 'Success', description: 'Album was created successfully', color: 'success' })
        queryClient.invalidateQueries({ queryKey: $orpc.albums.key() })
      }
    })
  }))
}

export const useFetchAlbumImages = () => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.albums.list.queryOptions({
    select(data) {
      return data.map((curr) => ({
        id: useId(),
        title: curr.title,
        images: curr.images.map(curr => "/cdn/" + curr)
      }))
    }
  })))    
}

export const useFetchAlbums = (admin: boolean) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.albums.list.queryOptions({
    select(data) {
      const urlPrefix = admin ? '/admin' : ''
      return data.map((curr) => ({
        title: curr.title,
        description: `Contains ${curr.images.length} Images`,
        to: `${urlPrefix}/gallery/album?id=${admin ? curr.id : curr.slug}`
      }))
    }
  })))    
}

export const useFetchAlbumById = (id: string) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.albums.findById.queryOptions({ input: { id } })))
}

export const useFetchAlbumBySlug = (slug: string) => {
  const { $orpc } = useNuxtApp()
  return useQuery(computed(() => $orpc.albums.findBySlug.queryOptions({
    input: { slug }
  })))
}

export const useDeleteAlbum = () => {  
  const toast = useToast()
  const { $orpc } = useNuxtApp()

  return useMutation(computed(() => {
    return $orpc.albums.deleteSingle.mutationOptions({
      onError(error) {
        toast.add({ title: 'Error', description: error.message, color: 'error' })
      },
      onSuccess(){
        toast.add({ title: 'Success', description: 'Album was deleted successfully', color: 'success' })
        navigateTo("/admin/gallery")
      }
    })
  }))
}

export const useUpdateAlbum = () => {  
  const toast = useToast()
  const { $orpc } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation(computed(() => {
    return $orpc.albums.update.mutationOptions({
      onError(error) {
        toast.add({ title: 'Error', description: error.message, color: 'error' })
      },
      onSuccess(){
        toast.add({ title: 'Success', description: 'Album has been updated successfully', color: 'success' })
        queryClient.invalidateQueries({ queryKey: $orpc.albums.key() })
      }
    })
  }))
}