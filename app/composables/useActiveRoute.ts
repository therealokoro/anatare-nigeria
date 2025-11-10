import type { NavigationMenuItem } from "@nuxt/ui"

export const useActiveRouteLink = <T extends NavigationMenuItem>(
  links: T[],
  homeRoute = "/"
) => {
  return computed<NavigationMenuItem[]>(() => {
    const route = useRoute()

    return links.map((currLinkItem) => {
      if (currLinkItem.to === homeRoute && route.path !== homeRoute) {
        return { ...currLinkItem, active: false }
      }

      if (!currLinkItem.to) return currLinkItem

      const active = route.path.startsWith(currLinkItem.to.toString())
      return { ...currLinkItem, active }
    })
  })
}
