<template>
  <DashboardPage title="Articles">
    <UButton label="Create New Article" icon="lucide:plus" to="/admin/articles/new" class="mb-5" />

    <ArticleGrid is-admin />
  </DashboardPage>
</template>
