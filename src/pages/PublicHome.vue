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

    <!-- Tests Section -->
    <section v-if="publishedTests.length > 0" class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-slate-800 mb-3">Проверьте свои знания</h2>
          <p class="text-lg text-slate-600">Пройдите наши тесты и убедитесь в своей квалификации</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="test in publishedTests"
            :key="test.id"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {{ test.title }}
                  </h3>
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
import { pagesApi, testsApi } from '../services/api'
import type { Page, Test } from '../types'

const allPages = ref<Page[]>([])
const allTests = ref<Test[]>([])

const recentPages = computed(() =>
  allPages.value
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
)

const publishedTests = computed(() =>
  allTests.value.filter(t => t.status === 'published')
)

onMounted(async () => {
  allPages.value = await pagesApi.getAll()
  allTests.value = await testsApi.getAll()
})
</script>
