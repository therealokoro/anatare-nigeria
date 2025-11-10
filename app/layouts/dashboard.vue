<script setup lang="ts">
const open = ref(false)

function onSelect() {
  open.value = false
}

const auth = useAuth()

const links = useActiveRouteLink([
  { label: "Overview", icon: "i-lucide-house", to: "/admin", onSelect },
  { label: "Articles", icon: "i-lucide-newspaper", to: "/admin/articles", onSelect },
  { label: "Gallery", icon: "i-lucide-image", to: "/admin/gallery", onSelect },
  { label: "Messages", icon: "lucide:message-square-text", to: "/admin/messages", onSelect },
  { label: "Settings", icon: "i-lucide-settings", to: "/admin/#settings", onSelect },
  { label: "Logout", icon: "i-lucide-log-out", onSelect: () => auth.signOut({ redirectTo: "/login" }) }
], "/admin")

const getRouteName = computed(() => links.value.find(curr => curr.active == true)?.label)
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      mode="slideover"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header>
        <nuxt-link to="/admin">
          <PageLogo compact class="my-3" />
        </nuxt-link>
      </template>

      <template #default>
        <UNavigationMenu
          :items="links" orientation="vertical"
          :ui="{ list: 'space-y-3', item: 'text-xs' }"
          tooltip
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :title="getRouteName" />
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
