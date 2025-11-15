export const useGallery = () => {
  const images = [
    {
      title: "ACHEI PN HIV Counseling and Testing SFH KP-Care 2 Project",
      src: "/gallery/testing-1.jpg"
    },
    {
      title: "ACHEI PN HIV Counseling and Testing SFH KP-Care 2 Project",
      src: "/gallery/testing-2.jpg"
    },
    {
      title: "ACHEI PN HIV Counseling and Testing SFH KP-Care 2 Project",
      src: "/gallery/hiv-councel-1.jpg"
    },
    {
      title: "ACHEI PN HIV Counseling and Testing SFH KP-Care 2 Project",
      src: "/gallery/hiv-councel-2.jpg"
    },
    {
      title:
      "Strategic Planning NYNETHA Board of Directors and National Coordinators",
      src: "/gallery/board-of-dir.jpg"
    },
    {
      title: "16 Days of GBV Activism Kebbi State",
      src: "/gallery/gbv-1.jpg"
    },
    {
      title: "16 Days of GBV Activism Kebbi State ACHEI with GBV TWG Team 2024",
      src: "/gallery/gbv-2.jpg"
    },
    {
      title: "16 Days of GBV Activism Kebbi State ACHEI with GBV TWG Team 2024",
      src: "/gallery/gbv-3.jpg"
    },
    {
      title: "16 Days of GBV Activism Kebbi State ACHEI with GBV TWG Team 2024",
      src: "/gallery/gbv-4.jpg"
    },
    {
      title: "World Aids Day with NYNETHA 2024",
      src: "/gallery/world-aids-1.jpg"
    },
    {
      title: "World Aids Day with NYNETHA 2024",
      src: "/gallery/world-aids-2.jpg"
    },
    {
      title: "World Aids Day with NYNETHA 2024",
      src: "/gallery/world-aids-3.jpg"
    },
    {
      title: "World Aids Day with NYNETHA 2024",
      src: "/gallery/world-aids-4.jpg"
    },
    {
      title: "ACHEI E.D - Paralegal Training by SFH 2024",
      src: "/gallery/para-training-1.jpg"
    },
    {
      title: "ACHEI E.D - Paralegal Training by SFH 2024",
      src: "/gallery/para-training-2.jpg"
    },
    {
      title: "ACHEI E.D - Paralegal Training by SFH 2024",
      src: "/gallery/para-training-3.jpg"
    },
    {
      title: "ACHEI E.D - Paralegal Training by SFH 2024",
      src: "/gallery/para-training-4.jpg"
    },
    {
      title: "Inception Meeting SFH - ACHEI & Other CBOs 2024",
      src: "/gallery/inception-meeting.jpg"
    },
    {
      title: "ACHEI E.D/SFH DCOP/TIEO E.D 2024",
      src: "/gallery/dcop.jpg"
    },
    {
      title: "ACHEI Team E.D/Programs/Programs/Finance/M&E 2024",
      src: "/gallery/achei-team.jpg"
    }
  ]

  return { images }
}

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