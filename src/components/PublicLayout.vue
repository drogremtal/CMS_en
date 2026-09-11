<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Public Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/site" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h1 class="text-base font-bold text-slate-800">Enterprise Corp</h1>
              <p class="text-[10px] text-slate-400 -mt-0.5">Корпоративный портал</p>
            </div>
          </router-link>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <div
              v-for="page in publishedPages"
              :key="page.id"
              class="relative group"
            >
              <router-link
                :to="`/site/${page.slug}`"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1',
                  currentSlug === page.slug
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                ]"
              >
                {{ page.title }}
                <svg
                  v-if="getTestsForPage(page.id).length > 0"
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </router-link>
              
              <!-- Dropdown with tests -->
              <div
                v-if="getTestsForPage(page.id).length > 0"
                class="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2"
              >
                <div class="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Тесты по теме
                </div>
                <router-link
                  v-for="test in getTestsForPage(page.id)"
                  :key="test.id"
                  :to="`/site/test/${test.id}`"
                  class="block px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>{{ test.title }}</span>
                  </div>
                </router-link>
              </div>
            </div>
            <router-link
              to="/site/tests"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                $route.path === '/site/tests'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              ]"
            >
              Все тесты
            </router-link>
          </nav>

          <!-- Admin Link -->
          <div class="flex items-center gap-3">
            <router-link
              to="/"
              class="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Админ-панель
            </router-link>

            <!-- Mobile menu -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 hover:bg-slate-100 rounded-lg">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="mobileMenuOpen" class="md:hidden py-3 border-t border-slate-100 space-y-1">
          <router-link
            v-for="page in publishedPages"
            :key="page.id"
            :to="`/site/${page.slug}`"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            {{ page.title }}
          </router-link>
          <router-link
            to="/site/tests"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            Тесты
          </router-link>
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            → Админ-панель
          </router-link>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 mt-auto">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 class="text-white font-bold">Enterprise Corp</h3>
            </div>
            <p class="text-sm text-slate-400 max-w-md">
              Ведущий поставщик корпоративных IT-решений. Более 14 лет на рынке, 500+ специалистов, клиенты в 20+ странах.
            </p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3 text-sm">Навигация</h4>
            <ul class="space-y-2">
              <li v-for="page in publishedPages" :key="page.id">
                <router-link :to="`/site/${page.slug}`" class="text-sm text-slate-400 hover:text-white transition-colors">
                  {{ page.title }}
                </router-link>
              </li>
              <li>
                <router-link to="/site/tests" class="text-sm text-slate-400 hover:text-white transition-colors">
                  Тесты
                </router-link>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3 text-sm">Контакты</h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li>г. Москва, ул. Примерная, 1</li>
              <li>+7 (495) 123-45-67</li>
              <li>info@company.ru</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p class="text-xs text-slate-500">© 2024 Enterprise Corp. Все права защищены.</p>
          <p class="text-xs text-slate-500">Powered by Enterprise CMS • Vue 3 + ASP.NET Core</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pagesApi, testsApi } from '../services/api'
import type { Page, Test } from '../types'

const route = useRoute()
const mobileMenuOpen = ref(false)
const allPages = ref<Page[]>([])
const allTests = ref<Test[]>([])

const publishedPages = computed(() =>
  allPages.value
    .filter(p => p.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder)
)

const publishedTests = computed(() =>
  allTests.value.filter(t => t.status === 'published')
)

const currentSlug = computed(() => route.params.slug as string)

function getTestsForPage(pageId: string): Test[] {
  return publishedTests.value.filter(t => t.linkedPageId === pageId)
}

onMounted(async () => {
  allPages.value = await pagesApi.getAll()
  allTests.value = await testsApi.getAll()
})
</script>
