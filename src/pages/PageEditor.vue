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
          <h1 class="text-xl font-bold text-slate-800">{{ isNew ? 'Новая страница' : 'Редактирование' }}</h1>
          <p class="text-sm text-slate-500">{{ isNew ? 'Создание новой страницы' : page.title }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="handleSave('draft')"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          {{ saving ? 'Сохранение...' : 'Сохранить черновик' }}
        </button>
        <button
          @click="handleSave('published')"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Опубликовать
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main Editor -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Title -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <input
            v-model="page.title"
            @input="onTitleChange"
            type="text"
            placeholder="Заголовок страницы"
            class="w-full text-2xl font-bold text-slate-800 placeholder-slate-300 focus:outline-none border-none"
          />
          <div class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <span class="text-xs text-slate-400">URL:</span>
            <input
              v-model="page.slug"
              type="text"
              placeholder="slug-stranitsy"
              class="text-sm text-slate-600 bg-transparent focus:outline-none flex-1"
            />
          </div>
        </div>

        <!-- Content Editor -->
        <div class="bg-white rounded-xl border border-slate-200">
          <!-- Toolbar -->
          <div class="flex items-center gap-1 p-3 border-b border-slate-200 overflow-x-auto">
            <button v-for="tool in toolbar" :key="tool.tag" @click="insertTag(tool.tag)" :title="tool.title" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tool.path" />
              </svg>
            </button>
          </div>

          <!-- Editor Area -->
          <textarea
            ref="contentEditor"
            v-model="page.content"
            placeholder="Начните вводить содержимое страницы..."
            class="w-full min-h-[400px] p-5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none resize-y font-mono leading-relaxed"
          ></textarea>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Tabs -->
        <div class="bg-white rounded-xl border border-slate-200">
          <div class="flex border-b border-slate-200">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex-1 px-3 py-3 text-xs font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="p-4 space-y-4">
            <!-- Content Tab -->
            <template v-if="activeTab === 'content'">
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Шаблон</label>
                <select v-model="page.template" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="default">Стандартная</option>
                  <option value="landing">Лендинг</option>
                  <option value="blog">Блог</option>
                  <option value="contact">Контакты</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Статус</label>
                <select v-model="page.status" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликовано</option>
                  <option value="archived">В архиве</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Порядок сортировки</label>
                <input v-model.number="page.sortOrder" type="number" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </template>

            <!-- SEO Tab -->
            <template v-if="activeTab === 'seo'">
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Meta Description</label>
                <textarea
                  v-model="page.metaDescription"
                  placeholder="Описание страницы для поисковых систем"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                ></textarea>
                <p class="text-xs text-slate-400 mt-1">{{ (page.metaDescription || '').length }}/160 символов</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Meta Keywords</label>
                <input
                  v-model="page.metaKeywords"
                  type="text"
                  placeholder="ключевые, слова, через, запятую"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="p-3 bg-slate-50 rounded-lg">
                <p class="text-xs text-slate-400 mb-1">Предпросмотр в Google:</p>
                <p class="text-sm text-blue-700 truncate">{{ page.title || 'Заголовок страницы' }}</p>
                <p class="text-xs text-emerald-700 truncate">company.ru/{{ page.slug || 'slug' }}</p>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2">
                  {{ page.metaDescription || 'Описание страницы будет отображаться здесь...' }}
                </p>
              </div>
            </template>

            <!-- Settings Tab -->
            <template v-if="activeTab === 'settings'">
              <div>
                <label class="block text-xs font-medium text-slate-600 mb-1.5">Автор</label>
                <input v-model="page.author" type="text" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div v-if="!isNew" class="pt-3 border-t border-slate-100">
                <p class="text-xs text-slate-400">Создано: {{ formatDate(page.createdAt) }}</p>
                <p class="text-xs text-slate-400 mt-1">Обновлено: {{ formatDate(page.updatedAt) }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pagesApi } from '../services/api'
import type { Page } from '../types'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const isNew = id === 'new' || !id

const contentEditor = ref<HTMLTextAreaElement | null>(null)
const saving = ref(false)
const activeTab = ref('content')

const page = ref<Partial<Page>>({
  title: '',
  slug: '',
  content: '',
  status: 'draft',
  author: 'Администратор',
  metaDescription: '',
  metaKeywords: '',
  template: 'default',
  sortOrder: 0,
})

const tabs = [
  { id: 'content', label: 'Контент' },
  { id: 'seo', label: 'SEO' },
  { id: 'settings', label: 'Настройки' },
]

const toolbar = [
  { tag: 'h1', title: 'Заголовок 1', path: 'M4 6h16M4 12h8m-8 6h16' },
  { tag: 'h2', title: 'Заголовок 2', path: 'M4 6h16M4 12h12m-12 6h8' },
  { tag: 'bold', title: 'Жирный', path: 'M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z' },
  { tag: 'italic', title: 'Курсив', path: 'M10 4h4m-2 0l-4 16m0 0h4' },
  { tag: 'list', title: 'Список', path: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  { tag: 'link', title: 'Ссылка', path: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { tag: 'quote', title: 'Цитата', path: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
  { tag: 'code', title: 'Код', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
]

function generateSlug(title: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  }
  return title
    .toLowerCase()
    .replace(/[а-яё]/gi, (char) => map[char] || char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function onTitleChange() {
  if (isNew) {
    page.value.slug = generateSlug(page.value.title || '')
  }
}

function insertTag(tag: string) {
  const textarea = contentEditor.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = (page.value.content || '').substring(start, end)
  let insertion = ''

  switch (tag) {
    case 'h1': insertion = `<h1>${selectedText || 'Заголовок'}</h1>`; break
    case 'h2': insertion = `<h2>${selectedText || 'Подзаголовок'}</h2>`; break
    case 'bold': insertion = `<strong>${selectedText || 'текст'}</strong>`; break
    case 'italic': insertion = `<em>${selectedText || 'текст'}</em>`; break
    case 'list': insertion = `<ul>\n<li>${selectedText || 'элемент'}</li>\n</ul>`; break
    case 'link': insertion = `<a href="#">${selectedText || 'ссылка'}</a>`; break
    case 'quote': insertion = `<blockquote>${selectedText || 'цитата'}</blockquote>`; break
    case 'code': insertion = `<code>${selectedText || 'код'}</code>`; break
  }

  const content = page.value.content || ''
  page.value.content = content.substring(0, start) + insertion + content.substring(end)
}

async function handleSave(status?: string) {
  saving.value = true
  const pageData = { ...page.value, status: status || page.value.status || 'draft' }

  if (isNew) {
    const created = await pagesApi.create(pageData as any)
    saving.value = false
    router.push(`/pages/edit/${created.id}`)
  } else {
    await pagesApi.update(id, pageData)
    saving.value = false
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('ru-RU')
}

onMounted(async () => {
  if (!isNew && id) {
    const data = await pagesApi.getById(id)
    if (data) page.value = data
  }
})
</script>
