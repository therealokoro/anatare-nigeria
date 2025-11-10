<script lang="ts" setup>
const { info } = useAppConfig()
const content = {
  status: "available",
  icon: "hugeicons:aids",
  title: "HIV Services",
  description:
    "We offer the following services on a regular basis and you are invited to join us",
  link: "/services/hiv-services"
}
</script>

<template>
  <Page
    contain
    show-hero
    :title="content.title"
    :description="content.description"
  >
    <div class="w-full flex flex-col md:flex-row flex-wrap gap-10">
      <!-- Left Column: Introduction -->
      <div class="flex-1">
        <h2 class="text-xl md:text-3xl font-extrabold mb-8">Introduction</h2>

        <div class="text-base leading-relaxed space-y-5">
          <p>
            At ACHEI, we recognize the critical importance of addressing the HIV
            epidemic in Kebbi State, and we are committed to providing
            comprehensive HIV services to support individuals living with HIV
            and those at risk of infection. Our HIV services are designed to be
            client-centered, confidential, and non-judgmental, ensuring that
            individuals feel comfortable and empowered to take control of their
            health.
          </p>

          <h3 class="font-bold text-lg text-foreground mt-6">
            We offer a range of HIV services, including:
          </h3>

          <ul class="list-disc pl-6 space-y-3">
            <li>
              <strong>Confidential HIV Testing:</strong> Rapid HIV testing
              services using validated test kits, ensuring accurate and reliable
              results.
            </li>
            <li>
              <strong>Pre-test and Post-test Counseling:</strong> Comprehensive
              counseling that provides risk reduction information and links
              clients to care and treatment.
            </li>
            <li>
              <strong>Distribution of Test Kits:</strong> Distributing HIV test
              kits to facilities and partners to increase access.
            </li>
            <li>
              <strong>Linkage to Care and Treatment:</strong> Ensuring
              individuals who test positive are connected to ongoing care and
              support.
            </li>
            <li>
              <strong>Antiretroviral Therapy (ART):</strong> Providing ART
              services, including initiation, monitoring, and adherence support
              for viral suppression.
            </li>
            <li>
              <strong>Adherence Support:</strong> Continuous guidance from
              trained adherence counselors to maintain treatment success.
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column: Access Info -->
      <div class="w-full md:w-[420px] bg-secondary-500 text-white p-8 rounded-xl self-start">
        <div class="flex items-center gap-2 mb-4">
          <Icon name="tabler:phone" class="size-5" />
          <h2 class="text-xl font-extrabold">Accessing Our Service</h2>
        </div>
        <p class="text-base mb-4 leading-relaxed">
          To access our HIV services, you can reach out to us through any of the
          following means:
        </p>

        <ul class="list-disc pl-6 space-y-2 text-base leading-relaxed">
          <li>
            <strong>Call: </strong>
            <span class="space-x-2">
              <a
                v-for="no in ['07067546592', '09169596959']"
                :key="no"
                :href="`tel:${no}`"
                class="underline"
              >
                {{ no }}
              </a>
            </span>
          </li>

          <li>
            <strong>Email: </strong>
            <a
              :href="`mailto:${info.email}`"
              class="underline"
            >
              {{ info.email }}
            </a>
          </li>

          <li>
            <strong>Visit a Testing Center: </strong>
            <span class="underline">{{ info.address }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Page>
</template>
