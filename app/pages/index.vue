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
    <LazyUPageSection title="Blog Posts" :ui="{ container: 'mx-auto' }">
      <LazyArticleGrid :limit="3" />
    </LazyUPageSection>

    <!-- Gallery SlideShpw -->
    <LazyHomepageSlideShow />

    <!-- Donations -->
    <LazyHomepageDonation />
  </Page>
</template>
