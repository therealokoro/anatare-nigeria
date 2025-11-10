<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui"
definePageMeta({ layout: "auth-page", auth: { only: "guest", redirectUserTo: "/admin" } })
const toast = useToast()

const fields: AuthFormField[] = [{
  name: "email",
  type: "email",
  label: "Email",
  placeholder: "Enter your email",
  help: "Enter your registered email address",
  required: true
}, {
  name: "password",
  label: "Password",
  type: "password",
  placeholder: "Enter your password",
  help: "Enter your registered password",
  required: true
}]

const LoginSchema = wrapType({ email: "string.email", password: "string>=8" }, {
  email: "Please provide a valid email address",
  password: "Please provide a password of atleast 8 chars"
})

type Schema = typeof LoginSchema.infer

const isLoggingIn = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const auth = useAuth()
  await auth.signIn.email({ ...payload.data, callbackURL: "/admin" }, {
    onError(ctx) { toast.add({ color: "error", description: ctx.error.message }) },
    onRequest(){ isLoggingIn.value = true },
    onResponse(){ isLoggingIn.value = false }
  })
}
</script>

<template>
  <Page title="Login" content-class="flex-center">
    <UCard class="w-md my-15">
      <UAuthForm
        :schema="LoginSchema"
        description="Enter your credentials to access your account."
        :fields="fields"
        title="Welcome back!"
        icon="i-lucide-lock"
        @submit="onSubmit"
        :submit="{ loading: isLoggingIn }"
      />

      <div class="w-full flex justify-center mt-3">
        <UButton label="Go to Homepage" variant="link" to="/" />
      </div>
    </UCard>
  </Page>
</template>
