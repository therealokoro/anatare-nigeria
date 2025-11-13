<template>
  <PageSection>
    <div class="w-full max-w-7xl mx-auto flex flex-col lg:flex-row overflow-hidden">
      <!-- Image -->
      <div class="lg:flex-1 h-[300px] lg:h-[500px]">
        <NuxtImg
          src="/images/smiling-kids.jpg"
          alt="Smiling Young Boy"
          class="w-full h-full object-cover object-[60%,50%]"
          :preload="{ fetchPriority: 'high' }"
          placeholder
        />
      </div>

      <!-- Write Up -->
      <div class="flex-2 bg-secondary-500 text-white p-6 lg:p-12 flex flex-col justify-center gap-5">
        <h2 class="text-xl lg:text-3xl font-extrabold">Who We Are</h2>
        <p class="text-sm lg:text-base leading-10 text-justify">
          AnaTare Community Health and Empowerment Initiative (ACHEI) is an independent, non-profit organization dedicated to improving the lives of vulnerable individuals and communities in Kebbi State. With a strong record of impactful interventions and deep local insight, ACHEI delivers comprehensive, sustainable programs addressing health, social, and economic challenges. Its multidisciplinary team of public health, social work, and community development experts collaborates closely with local authorities and partners to ensure effective, inclusive solutions. Focused particularly on Key Populations facing stigma, discrimination, and limited healthcare access, ACHEI tailors evidence-based, community-driven, and rights-centered programs to promote health, empowerment, and social justice.
        </p>
      </div>
    </div>
  </PageSection>
</template>
