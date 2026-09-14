<template>
  <div class="min-h-screen bg-slate-50">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script setup lang="ts">
import Layout from './components/Layout.vue'
</script>
