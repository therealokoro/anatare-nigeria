<script lang="ts" setup>
useHead({ title: "Homepage" })
</script>

<template>
  <Page>
    <template #hero>
      <HomepageHero />
    </template>

    <!-- Who We Are Section -->
    <HomepageWhoWeAre />

    <!-- Our Mission -->
    <LazyHomepageMission />

    <!-- Strategies -->
    <LazyHomepageStrategies />

    <!-- News -->
    <UPageSection title="Blog Posts" :ui="{ container: 'mx-auto' }">
      <ArticleGrid :limit="3" />
    </UPageSection>

    <!-- Gallery SlideShpw -->
    <LazyHomepageSlideShow />

    <!-- Donations -->
    <LazyHomepageDonation />
  </Page>
</template>
