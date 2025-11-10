<script lang="ts" setup>
// import { toTypedSchema as s } from "@vee-validate/zod"
// import { ContactUsSchema } from "~~/shared/schemas"

// const $form = useForm({ validationSchema: s(ContactUsSchema) })
// const onSubmit = $form.handleSubmit(async () => {})

const form = ref({
  name: "",
  email: "",
  phoneNo: "",
  organization: "",
  joinType: "",
  message: ""
})

const onSubmit = () => {
  console.log("Form submitted:", form.value)
  // You can integrate your actual submission logic here
}
</script>

<template>
  <Page
    contain show-hero
    title="Join Us Today"
    description="Join us for the betterment of our community at large"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <UPageCard :ui="{ root: 'rounded-none bg-secondary-500 text-white', container: 'p-6 sm:p-10' }">
        <h3 class="text-2xl font-extrabold tracking-tight">Join Us Today</h3>
        <p class="my-5 text-justify leading-loose text-pretty">
          At AnaTare Community Health and Empowerment Initiative (ACHEI),
          we're passionate about creating positive change in our communities.
          We believe that together, we can achieve more. Join our team of
          dedicated professionals, volunteers, and supporters to make a
          meaningful difference in the lives of vulnerable populations.
          <br><br>
          By joining our team of dedicated professionals, volunteers, and
          supporters, you'll become part of a dynamic and passionate community
          that shares your vision for a better world. Together, we can:
        </p>

        <ul class="list-disc ml-5 leading-loose">
          <li>Provide critical healthcare services to those who need them most</li>
          <li>Empower marginalized groups through education and economic opportunities</li>
          <li>Advocate for human rights and social justice</li>
          <li>Build stronger, more supportive communities</li>
        </ul>
      </UPageCard>

      <UPageCard :ui="{ root: 'rounded-none', container: 'p-6 sm:p-10' }">
        <h3 class="text-2xl font-extrabold tracking-tight">Fill the form below</h3>
        <UForm @submit="onSubmit">
          <fieldset class="flex flex-col gap-6">
            <!-- Full Name -->
            <UFormField label="Full name" name="name" required>
              <UInput
                v-model="form.name"
                placeholder="Enter your name here"
              />
            </UFormField>
            <!-- Email -->
            <UFormField label="Email" name="email" required>
              <UInput
                v-model="form.email"
                placeholder="Enter your email address here"
                type="email"
              />
            </UFormField>
            <!-- Phone Number -->
            <UFormField label="Phone Number" name="phoneNo" required>
              <UInput
                v-model="form.phoneNo"
                placeholder="Enter your phone number here"
                type="tel"
              />
            </UFormField>
            <!-- Organization -->
            <UFormField label="Organization" help="This is optional, you can leave it blank" name="organization">
              <UInput
                v-model="form.organization"
                placeholder="Enter your subject here"
              />
            </UFormField>
            <!-- Organization -->
            <UFormField
              label="How would you like to join us today"
              name="joinType"
            >
              <USelect v-model="form.joinType" placeholder="Select an option" :items="['Partner', 'Donor', 'Volunteer']" />
            </UFormField>
            <!-- Message -->
            <UFormField label="Message" name="message" required>
              <UTextarea
                v-model="form.message"
                placeholder="Enter your message here"
                autoresize
              />
            </UFormField>
            <!-- Submit Button -->
            <UButton
              type="submit" label="Send Message"
              color="primary"
              size="xl"
              block
            />
          </fieldset>
        </UForm>
      </UPageCard>
    </div>
  </Page>
</template>
