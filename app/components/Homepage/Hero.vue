<script setup lang="ts">
const partnerLogos = [
  {
    alt: "PEPFAR Logo",
    src: "/logos/pepfar.jpeg",
    width: 80
  },
  {
    alt: "USAID Logo",
    src: "/logos/usaid.png",
    width: 100
  },
  {
    alt: "Society for Family Health Logo",
    src: "/logos/sfh.png",
    width: 42,
    height: 42
  },
  {
    alt: "Kebbi State Government Logo",
    src: "/logos/kebbi.png",
    width: 42,
    height: 42
  }
]
</script>

<template>
  <UPageHero
    title="Bringing Empowerment and Healthy Living"
    description="Transforming vulnerable communities through comprehensive health programs, education initiatives, and sustainable economic empowerment."
    variant="naked"
    orientation="horizontal"
    :ui="{ title: 'text-4xl lg:text-6xl', container: 'py-15 sm:py-20 lg:py-25' }"
  >
    <!-- Hexagon Images -->
    <div class="relative flex-center lg:justify-end">
      <div class="hidden md:block">
        <NuxtImg
          src="/images/landing-image-grid.png"
          alt="Landing Image"
          format="webp"
          placeholder
          width="450"
          preload
        />
      </div>

      <div class="md:hidden">
        <NuxtImg
          src="/images/landing-img-mobile.png"
          alt="Landing Image"
          format="webp"
          placeholder
          width="450"
          preload
        />
      </div>
    </div>

    <!-- Overlay Background -->
    <div
      class="absolute inset-0 -z-10 h-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]"
    />

    <template #links>
      <div class="flex flex-col gap-5">
        <!-- CTA Buttons -->
        <div class="flex gap-1">
          <UButton size="xl">Learn More</UButton>
          <UButton variant="outline" size="xl">Donate Now</UButton>
        </div>
        <!-- Sponsor Logos -->
        <div class="w-max flex items-center gap-7">
          <img v-for="item in partnerLogos" v-bind="item">
        </div>
      </div>
    </template>
  </UPageHero>
</template>
