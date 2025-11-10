<template>
  <Page
    contain
    show-hero
    title="About Us"
    description="Read about how we were founded, learn about our values, and more."
  >
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Background -->
        <UPageCard :ui="{ root: 'rounded-none bg-primary text-white', container: 'p-6 sm:p-10' }">
          <h3 class="text-2xl font-extrabold tracking-tight">Background</h3>
          <p class="leading-loose text-pretty">
            AnaTare Community Health and Empowerment Initiative (ACHEI) is a
            non-profit organization established in 2021 and officially
            registered with the Corporate Affairs Commission (CAC) in 2022.
            Our organization is dedicated to empowering vulnerable
            individuals, communities, and marginalized groups to achieve
            quality health, education, and socio-economic independence.
            We envision a society where everyone has equal access to
            opportunities and resources, enabling them to thrive and reach
            their full potential.
          </p>
        </UPageCard>

        <!-- Mission Statement -->
        <UPageCard :ui="{ root: 'rounded-none bg-secondary-500 text-white', container: 'p-6 sm:p-10' }">
          <h3 class="text-2xl font-extrabold tracking-tight">Mission Statement</h3>
          <p class="leading-loose text-pretty">
            Our core mission is to provide comprehensive support services,
            advocate for human rights, and promote sustainable development
            through community-based initiatives. We strive to address the
            complex needs of our beneficiaries, fostering resilience,
            self-reliance, and social cohesion.
          </p>
        </UPageCard>
      </div>

      <!-- Right Column: Strategic Focus -->
      <UPageCard :ui="{ root: 'rounded-none bg-secondary-500 text-white', container: 'p-6 sm:p-10' }">
        <h3 class="text-2xl font-extrabold tracking-tight">
          Strategic Focus Points
        </h3>

        <div class="leading-loose space-y-4">
          <p>
            ACHEI's interventions are centered around the following key
            thematic areas:
          </p>

          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Key Population Care and Support:</strong> Providing
              targeted services for marginalized groups, including HIV/AIDS
              prevention, treatment, and care.
            </li>
            <li>
              <strong>Community Sensitization and Mobilization:</strong>
              Raising awareness on health, education, and social issues
              through community outreach programs.
            </li>
            <li>
              <strong>Orphan and Vulnerable Population Care and Support:</strong>
              Offering educational, nutritional, and psychosocial support to
              vulnerable children.
            </li>
            <li>
              <strong>Support for Physically Challenged Persons:</strong>
              Promoting inclusivity and accessibility through assistive
              technologies and skills training.
            </li>
            <li>
              <strong>Community Capacity Building and Basic Education:</strong>
              Enhancing community resilience through vocational training,
              literacy programs, and education advocacy.
            </li>
            <li>
              <strong>Sexual and Gender-Based Violence (SGBV)
                Prevention and Response:</strong>
              Providing safe spaces, counseling, and referral services for
              survivors.
            </li>
            <li>
              <strong>Gender Mainstreaming and Human Rights Education:</strong>
              Advocating for gender equality, human rights, and social
              justice.
            </li>
          </ul>
        </div>
      </UPageCard>
    </div>
  </Page>
</template>
