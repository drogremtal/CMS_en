<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <router-link to="/pages" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-xl font-bold text-slate-800">Предпросмотр</h1>
          <p class="text-sm text-slate-500">{{ page?.title }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <router-link
          :to="`/pages/edit/${page?.id}`"
          class="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Редактировать
        </router-link>
        <button class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Открыть на сайте
        </button>
      </div>
    </div>

    <!-- Preview -->
    <div v-if="page" class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <!-- Browser Chrome -->
      <div class="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-amber-400"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <div class="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-500 border border-slate-200">
          https://company.ru/{{ page.slug }}
        </div>
      </div>

      <!-- Page Content -->
      <div class="p-8 max-w-4xl mx-auto">
        <div class="mb-6 pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2 mb-2">
            <span :class="['px-2 py-0.5 rounded text-xs font-medium', getStatusClass(page.status)]">
              {{ getStatusLabel(page.status) }}
            </span>
            <span class="text-xs text-slate-400">Шаблон: {{ page.template }}</span>
          </div>
          <h1 class="text-3xl font-bold text-slate-800">{{ page.title }}</h1>
          <p class="text-sm text-slate-400 mt-2">
            Обновлено: {{ formatDate(page.updatedAt) }} • Автор: {{ page.author }}
          </p>
        </div>
        <div class="prose prose-slate max-w-none" v-html="page.content"></div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-slate-500">Страница не найдена</p>
      <router-link to="/pages" class="text-blue-600 text-sm mt-2 inline-block">Вернуться к списку</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pagesApi } from '../services/api'
import type { Page } from '../types'

const route = useRoute()
const id = route.params.id as string
const page = ref<Page | null>(null)

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = { published: 'Опубликовано', draft: 'Черновик', archived: 'В архиве' }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-700',
    draft: 'bg-amber-50 text-amber-700',
    archived: 'bg-slate-100 text-slate-600',
  }
  return classes[status] || ''
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('ru-RU')
}

onMounted(async () => {
  if (id) {
    page.value = await pagesApi.getById(id)
  }
})
</script>
