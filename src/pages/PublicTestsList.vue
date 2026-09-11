<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-slate-800 mb-3">Доступные тесты</h1>
      <p class="text-lg text-slate-600">
        Пройдите тесты для проверки ваших знаний и навыков
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-slate-500">Загрузка тестов...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="publishedTests.length === 0" class="text-center py-20">
      <svg class="w-20 h-20 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Нет доступных тестов</h2>
      <p class="text-slate-500">В данный момент нет опубликованных тестов</p>
    </div>

    <!-- Tests Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="test in publishedTests"
        :key="test.id"
        class="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ test.title }}</h3>
          <p class="text-sm text-slate-600 mb-4 line-clamp-2">{{ test.description }}</p>

          <div class="flex flex-wrap gap-3 text-sm text-slate-500 mb-6">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ test.duration }} мин
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ test.questions.length }} вопросов
            </div>
          </div>

          <router-link
            :to="`/site/test/${test.id}`"
            class="block w-full text-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Начать тест
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { testsApi } from '../services/api'
import type { Test } from '../types'

const tests = ref<Test[]>([])
const loading = ref(true)

const publishedTests = computed(() => {
  return tests.value.filter(t => t.status === 'published')
})

onMounted(async () => {
  tests.value = await testsApi.getAll()
  loading.value = false
})
</script>
