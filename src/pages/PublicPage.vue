<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="py-20 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-slate-500">Загрузка страницы...</p>
    </div>

    <!-- Page Not Found -->
    <div v-else-if="!page" class="py-20 text-center">
      <svg class="w-20 h-20 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Страница не найдена</h2>
      <p class="text-slate-500 mb-6">Запрошенная страница не существует или была удалена</p>
      <router-link 
        to="/site"
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        На главную
      </router-link>
    </div>

    <!-- Page Content -->
    <div v-else>
      <!-- Breadcrumbs -->
      <div class="bg-slate-50 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-6 py-3">
          <nav class="flex items-center gap-2 text-sm">
            <router-link to="/site" class="text-slate-500 hover:text-blue-600 transition-colors">
              Главная
            </router-link>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-slate-700 font-medium">{{ page.title }}</span>
          </nav>
        </div>
      </div>

      <!-- Page Header -->
      <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-6 py-12">
          <div class="max-w-4xl">
            <h1 class="text-4xl font-bold text-slate-800 mb-4">{{ page.title }}</h1>
            <div class="flex items-center gap-4 text-sm text-slate-500">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ page.author }}
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(page.updatedAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Body -->
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="max-w-4xl">
          <div class="prose prose-lg prose-slate max-w-none" v-html="page.content"></div>
        </div>
      </div>

      <!-- Tests Section -->
      <div v-if="pageTests.length > 0" class="bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100">
        <div class="max-w-7xl mx-auto px-6 py-16">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-10">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-slate-800 mb-3">Проверьте свои знания</h2>
              <p class="text-lg text-slate-600">Пройдите тесты по теме этой страницы</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="test in pageTests"
                :key="test.id"
                class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-slate-800 mb-2">{{ test.title }}</h3>
                      <p class="text-sm text-slate-600 line-clamp-2">{{ test.description }}</p>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ test.duration }} мин</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ test.questions.length }} вопросов</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>{{ test.passingScore }}%</span>
                    </div>
                  </div>

                  <router-link
                    :to="`/site/test/${test.id}`"
                    class="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Начать тест
                  </router-link>
                </div>
              </div>
            </div>

            <div class="text-center mt-10">
              <router-link
                to="/site/tests"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <span>Посмотреть все тесты</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pagesApi, testsApi } from '../services/api'
import type { Page, Test } from '../types'

const route = useRoute()
const page = ref<Page | null>(null)
const allTests = ref<Test[]>([])
const loading = ref(true)

const pageTests = computed(() => {
  if (!page.value) return []
  return allTests.value.filter(t => 
    t.status === 'published' && 
    t.linkedPageId === page.value?.id
  )
})

async function loadPage() {
  loading.value = true
  const slug = route.params.slug as string
  
  console.log('Loading page with slug:', slug)
  
  try {
    const allPages = await pagesApi.getAll()
    console.log('All pages loaded:', allPages)
    
    page.value = allPages.find(p => p.slug === slug && p.status === 'published') || null
    console.log('Found page:', page.value)
    
    allTests.value = await testsApi.getAll()
    console.log('All tests loaded:', allTests.value)
  } catch (error) {
    console.error('Error loading page:', error)
  }
  
  loading.value = false
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(loadPage)

watch(() => route.params.slug, loadPage)
</script>
