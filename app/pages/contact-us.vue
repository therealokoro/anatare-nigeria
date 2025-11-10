<script lang="ts" setup>
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
})

const onSubmit = () => {
  console.log("Form submitted:", form.value)
  // You can integrate your actual submission logic here
}
</script>

<template>
  <Page
    contain
    show-hero
    title="Contact Us"
    description="We would love to hear from you. Reach out to us today"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <UPageCard :ui="{ root: 'rounded-none', container: 'p-6 sm:p-10' }">
        <h3 class="text-2xl font-extrabold tracking-tight">Fill the form below</h3>
        <UForm @submit="onSubmit">
          <fieldset class="flex flex-col gap-6">
            <!-- Full Name -->
            <UFormField label="Full name" name="name" required>
              <UInput
                v-model="form.name"
                placeholder="Enter your full name here"
              />
            </UFormField>
            <!-- Email -->
            <UFormField label="Email" name="email" required>
              <UInput
                v-model="form.email"
                placeholder="Enter your email here"
                type="email"
              />
            </UFormField>
            <!-- Subject -->
            <UFormField label="Subject" name="subject" required>
              <UInput
                v-model="form.subject"
                placeholder="Enter your subject here"
              />
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

      <UCard :ui="{ root: 'rounded-none bg-secondary text-white', body: 'space-y-8' }">
        <h3 class="text-2xl font-extrabold tracking-tight">Mission Statement</h3>
        <p class="text-justify leading-loose">
          At AnaTare Community Health and Empowerment Initiative (ACHEI),
          we're committed to building meaningful relationships with our
          community, partners, and stakeholders. Whether you're seeking
          information, wanting to collaborate, or simply wanting to share your
          thoughts, we're eager to hear from you. Contact us today.
          <br>
          <br>
          We believe that every conversation, question, and concern is an
          opportunity to grow and improve. Our contact page is your gateway to
          connecting with our team. Share your thoughts, ask questions, or
          request information – we're here to listen and respond.
        </p>
      </UCard>
    </div>
  </Page>
</template>
