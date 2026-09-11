<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Страницы</h1>
        <p class="text-sm text-slate-500 mt-1">
          Управление контентом сайта • {{ pages.length }} {{ getPageWord(pages.length) }}
        </p>
      </div>
      <router-link
        to="/pages/new"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Новая страница
      </router-link>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl border border-slate-200 p-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Поиск страниц..."
            class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select
            v-model="statusFilter"
            class="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все статусы</option>
            <option value="published">Опубликовано</option>
            <option value="draft">Черновики</option>
            <option value="archived">В архиве</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Страница</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Шаблон</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Обновлено</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Автор</th>
              <th class="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="page in filteredPages" :key="page.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-800">{{ page.title }}</p>
                    <p class="text-xs text-slate-400 mt-0.5">/{{ page.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 hidden md:table-cell">
                <span class="text-sm text-slate-600">{{ getTemplateLabel(page.template) }}</span>
              </td>
              <td class="px-5 py-4">
                <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClass(page.status)]">
                  {{ getStatusLabel(page.status) }}
                </span>
              </td>
              <td class="px-5 py-4 hidden lg:table-cell">
                <span class="text-sm text-slate-500">{{ formatTimeAgo(page.updatedAt) }}</span>
              </td>
              <td class="px-5 py-4 hidden lg:table-cell">
                <span class="text-sm text-slate-600">{{ page.author }}</span>
              </td>
              <td class="px-5 py-4 text-right">
                <div class="relative inline-block">
                  <button
                    @click="toggleMenu(page.id)"
                    class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <div
                    v-if="openMenu === page.id"
                    class="absolute right-0 top-8 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1"
                  >
                    <router-link
                      :to="`/pages/edit/${page.id}`"
                      class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Редактировать
                    </router-link>
                    <router-link
                      :to="`/pages/preview/${page.id}`"
                      class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Просмотр
                    </router-link>
                    <button
                      @click="handleDuplicate(page)"
                      class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full text-left"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Дублировать
                    </button>
                    <div class="border-t border-slate-100 my-1"></div>
                    <button
                      @click="handleDelete(page.id)"
                      class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Удалить
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredPages.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-slate-500 font-medium">Страницы не найдены</p>
        <p class="text-sm text-slate-400 mt-1">Попробуйте изменить фильтры</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { pagesApi } from '../services/api'
import type { Page } from '../types'

const pages = ref<Page[]>([])
const searchTerm = ref('')
const statusFilter = ref('all')
const openMenu = ref<string | null>(null)

const filteredPages = computed(() => {
  return pages.value.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || page.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

function getPageWord(count: number): string {
  if (count === 1) return 'страница'
  if (count >= 2 && count <= 4) return 'страницы'
  return 'страниц'
}

function getTemplateLabel(template: string): string {
  const labels: Record<string, string> = {
    default: 'Стандартная',
    landing: 'Лендинг',
    blog: 'Блог',
    contact: 'Контакты',
  }
  return labels[template] || template
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    published: 'Опубликовано',
    draft: 'Черновик',
    archived: 'В архиве',
  }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-amber-50 text-amber-700 border-amber-200',
    archived: 'bg-slate-50 text-slate-600 border-slate-200',
  }
  return classes[status] || ''
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'только что'
  if (minutes < 60) return `${minutes} мин назад`
  if (hours < 24) return `${hours} ч назад`
  return `${days} дн назад`
}

function toggleMenu(id: string) {
  openMenu.value = openMenu.value === id ? null : id
}

async function handleDelete(id: string) {
  if (confirm('Вы уверены, что хотите удалить эту страницу?')) {
    await pagesApi.delete(id)
    await loadPages()
  }
  openMenu.value = null
}

async function handleDuplicate(page: Page) {
  await pagesApi.create({
    title: `${page.title} (копия)`,
    slug: `${page.slug}-copy`,
    content: page.content,
    status: 'draft',
    author: page.author,
    metaDescription: page.metaDescription,
    metaKeywords: page.metaKeywords,
    template: page.template,
    sortOrder: page.sortOrder,
  })
  await loadPages()
  openMenu.value = null
}

async function loadPages() {
  pages.value = await pagesApi.getAll()
}

onMounted(loadPages)
</script>
