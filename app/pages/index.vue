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
    <HomepageMission />

    <!-- Strategies -->
    <HomepageStrategies />

    <!-- News -->
    <HomepageNews />

    <!-- Gallery SlideShpw -->
    <HomepageSlideShow />

    <!-- Donations -->
    <HomepageDonation />
  </Page>
</template>
