<script lang="ts" setup>
const strategies = [
  { label: "01", body: "Increase medical support services through outreach and sensitization." },
  { label: "02", body: "Community mobilization, dialogue, gender mainstreaming, resource mobilization, and capacity building." },
  { label: "03", body: "Accessible healthcare delivery for vulnerable populations via door-to-door services and outreach." },
  { label: "04", body: "Increase sensitization on HIV/AIDS; provide testing kits, PrEP, PEP, ART, and support groups." },
  { label: "05", body: "Improve access to medical care and prevention of childhood illnesses (Malaria, Pneumonia, Diarrhea)." },
  { label: "06", body: "Increase access to quality education, preparing children for a brighter future." },
  { label: "07", body: "Foster education for orphans and vulnerable children (OVC)." },
  { label: "08", body: "Enhance teaching capacity to improve learning outcomes." },
  { label: "09", body: "Improve rural livelihoods through skill acquisition." },
  { label: "10", body: "Increase income and livelihood sustainability through empowerment programs." },
  { label: "11", body: "Raise awareness on Sexual and Gender-Based Violence (SGBV)." },
  { label: "12", body: "Conduct outreach to expand access to health, education, and psychosocial support in priority communities." }
]
</script>

<template>
  <UPageSection title="Our Strategies">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      <div
        v-for="(item, index) in strategies"
        :key="index"
        class="strategy-card group"
      >
        <div class="number-badge">
          {{ item.label }}
        </div>
        <p class="body-text">
          {{ item.body }}
        </p>
      </div>
    </div>
  </UPageSection>
</template>

<style scoped lang="css">
@reference "~/assets/css/main.css";

/* ✅ Card base */
.strategy-card {
  @apply flex flex-col items-center justify-start text-center bg-muted border border-gray-100 hover:border-primary/30 transition-colors duration-200 p-6 md:p-8 h-full min-h-[220px];
}

/* ✅ Number badge with subtle accent */
.number-badge {
  @apply flex items-center justify-center w-12 h-12 mb-5 rounded-full font-bold text-sm md:text-base text-white bg-primary transition-transform duration-300 group-hover:scale-110;
}

/* ✅ Text styling */
.body-text {
  @apply text-sm leading-relaxed font-semibold text-secondary-900;
}

/* ✅ Hover feedback */
.strategy-card:hover {
  @apply bg-white;
}
</style>
