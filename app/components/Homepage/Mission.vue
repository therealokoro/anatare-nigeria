<template>
  <UPageSection title="Our Mission">
    <div class="full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>div]:p-10">
      <!-- Mission -->
      <div class="bg-brand-primary-500 text-white">
        <div class="size-15 flex-center border-2 border-current">
          <Icon class="size-8" name="tabler:target" />
        </div>
        <h3 class="card-title">Mission</h3>
        <p class="text-sm/7">
          Our Core Mission at ACHEI is to empower vulnerable communities towards
          achieving quality health, good education and socio-economic
          independence.
        </p>
      </div>

      <!-- Vision -->
      <div class="bg-secondary-500 text-white">
        <div class="size-15 flex-center border-2 border-current">
          <Icon class="size-8" name="mingcute:hand-heart-line" />
        </div>
        <h3 class="card-title">Values</h3>
        <p class="text-sm/7">
          At ACHEI, our values are accountability, confidentiality, equity and
          justice, innovation and creativity, integrity, and transparency.
        </p>
      </div>

      <!-- Goal -->
      <div class="p-10 bg-muted text-secondary-500">
        <div class="size-15 flex-center border-2 border-current">
          <Icon class="size-8" name="tabler:flag" />
        </div>
        <h3 class="card-title">Goal</h3>
        <p class="text-sm/7">
          To create a society where the vulnerable and marginalized persons have
          access to quality health care, are empowered, enjoy their rights and
          take charge of their lives.
        </p>
      </div>
    </div>
  </UPageSection>
</template>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

.card-title{
  @apply my-7 text-lg md:text-xl font-extrabold
}
</style>
