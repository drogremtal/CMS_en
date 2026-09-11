<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Комплексные IT-решения для вашего бизнеса
          </h1>
          <p class="text-xl text-blue-100 mb-8 leading-relaxed">
            Мы помогаем компаниям трансформировать бизнес-процессы с помощью современных технологий. 
            Более 14 лет опыта, 500+ специалистов, клиенты в 20+ странах.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link 
              to="/site/services"
              class="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Наши услуги
            </router-link>
            <router-link 
              to="/site/contacts"
              class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors border border-blue-500"
            >
              Связаться с нами
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">14+</div>
            <div class="text-sm text-slate-600">Лет на рынке</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div class="text-sm text-slate-600">Специалистов</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div class="text-sm text-slate-600">Стран присутствия</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div class="text-sm text-slate-600">Проектов</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Pages -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-slate-800 mb-8">Последние обновления</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link
            v-for="page in recentPages"
            :key="page.id"
            :to="`/site/${page.slug}`"
            class="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-300"
          >
            <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {{ page.title }}
            </h3>
            <p class="text-sm text-slate-500 line-clamp-2">
              {{ page.metaDescription || 'Подробнее о странице...' }}
            </p>
            <div class="mt-4 text-sm text-blue-600 font-medium flex items-center gap-1">
              Читать далее
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Готовы начать проект?</h2>
        <p class="text-xl text-blue-100 mb-8">Свяжитесь с нами для бесплатной консультации</p>
        <router-link
          to="/site/contacts"
          class="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
        >
          Получить консультацию
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { pagesApi } from '../services/api'
import type { Page } from '../types'

const allPages = ref<Page[]>([])

const recentPages = computed(() =>
  allPages.value
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
)

onMounted(async () => {
  allPages.value = await pagesApi.getAll()
})
</script>
