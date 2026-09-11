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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pagesApi } from '../services/api'
import type { Page } from '../types'

const route = useRoute()
const page = ref<Page | null>(null)
const loading = ref(true)

async function loadPage() {
  loading.value = true
  const slug = route.params.slug as string
  
  const allPages = await pagesApi.getAll()
  page.value = allPages.find(p => p.slug === slug && p.status === 'published') || null
  
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
