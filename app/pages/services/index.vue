<script setup lang="ts">
const cards = [
  {
    status: "available",
    icon: "hugeicons:aids",
    title: "HIV Services",
    description:
        "We offer the following services on a regular basis and you are invited to join us",
    to: "/services/hiv-services"
  },
  {
    status: "available",
    icon: "mingcute:certificate-2-line",
    title: "Skills Acquisition",
    description:
        "We offer the following services on a regular basis and you are invited to join us",
    to: "/services/#skill-acquisition"
  },
  {
    status: "available",
    icon: "mingcute:heart-hand-line",
    title: "GBV Services",
    description:
        "We offer the following services on a regular basis and you are invited to join us",
    to: "/services/#gbv-services"
  }
]
</script>

<template>
  <Page
    title="Our Services"
    description="Have an overview and an even deeper knowledge and understanding of the services we render"
    show-hero
    contain
  >
    <UPageGrid>
      <UPageCard
        v-for="(card, index) in cards"
        :key="index"
        :ui="{ leadingIcon: 'size-10' }"
        v-bind="card"
      />
    </UPageGrid>
  </Page>
</template>
