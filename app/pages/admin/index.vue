<script lang="ts" setup>
const auth = useAuth()
</script>

<template>
  <Page title="Overview">
    <h1>Welcome Back, {{ auth.user.value?.name }}</h1>
  </Page>
</template>
