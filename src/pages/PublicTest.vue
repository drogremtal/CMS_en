<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-slate-500">Загрузка теста...</p>
    </div>

    <!-- Test Not Found -->
    <div v-else-if="!test" class="text-center py-20">
      <svg class="w-20 h-20 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Тест не найден</h2>
      <p class="text-slate-500 mb-6">Запрошенный тест не существует или был удален</p>
      <router-link to="/site" class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        На главную
      </router-link>
    </div>

    <!-- Test Content -->
    <div v-else>
      <!-- Test Header -->
      <div class="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h1 class="text-3xl font-bold text-slate-800 mb-3">{{ test.title }}</h1>
        <p class="text-slate-600 mb-4">{{ test.description }}</p>
        <div class="flex flex-wrap gap-4 text-sm text-slate-500">
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ test.duration }} минут
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ test.questions.length }} вопросов
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Проходной балл: {{ test.passingScore }}%
          </div>
        </div>
      </div>

      <!-- Questions -->
      <form @submit.prevent="submitTest" class="space-y-6">
        <div
          v-for="(question, qIndex) in test.questions"
          :key="question.id"
          class="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-semibold text-slate-800">
              Вопрос {{ qIndex + 1 }} из {{ test.questions.length }}
            </h3>
            <span class="text-sm text-slate-500">{{ question.points }} {{ question.points === 1 ? 'балл' : 'балла' }}</span>
          </div>

          <p class="text-slate-700 mb-4">{{ question.text }}</p>

          <!-- Single Choice -->
          <div v-if="question.type === 'single'" class="space-y-2">
            <label
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              :class="{ 'border-blue-500 bg-blue-50': answers[qIndex] === oIndex }"
            >
              <input
                type="radio"
                :name="`question-${qIndex}`"
                :value="oIndex"
                v-model="answers[qIndex]"
                class="w-4 h-4 text-blue-600"
              />
              <span class="text-sm text-slate-700">{{ option }}</span>
            </label>
          </div>

          <!-- Multiple Choice -->
          <div v-else-if="question.type === 'multiple'" class="space-y-2">
            <label
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              :class="{ 'border-blue-500 bg-blue-50': (answers[qIndex] as number[]).includes(oIndex) }"
            >
              <input
                type="checkbox"
                :value="oIndex"
                v-model="answers[qIndex]"
                class="w-4 h-4 text-blue-600 rounded"
              />
              <span class="text-sm text-slate-700">{{ option }}</span>
            </label>
          </div>

          <!-- Text Answer -->
          <div v-else-if="question.type === 'text'">
            <textarea
              v-model="answers[qIndex]"
              placeholder="Введите ваш ответ..."
              class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center pt-6">
          <button
            type="submit"
            :disabled="!allQuestionsAnswered"
            class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Завершить тест
          </button>
        </div>
      </form>

      <!-- Results -->
      <div v-if="showResults" class="mt-8 bg-white rounded-xl border border-slate-200 p-6">
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Результаты теста</h2>
        <div class="text-center py-8">
          <div class="text-6xl font-bold mb-4" :class="passed ? 'text-emerald-600' : 'text-red-600'">
            {{ score }}%
          </div>
          <p class="text-lg text-slate-700 mb-2">
            {{ passed ? 'Поздравляем! Вы прошли тест!' : 'К сожалению, вы не прошли тест.' }}
          </p>
          <p class="text-sm text-slate-500">
            Вы набрали {{ earnedPoints }} из {{ totalPoints }} баллов
          </p>
          <div class="mt-6 flex justify-center gap-4">
            <button
              @click="retakeTest"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Пройти еще раз
            </button>
            <router-link
              to="/site"
              class="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              На главную
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { testsApi } from '../services/api'
import type { Test } from '../types'

const route = useRoute()
const id = route.params.id as string

const test = ref<Test | null>(null)
const loading = ref(true)
const answers = ref<Record<number, any>>({})
const showResults = ref(false)
const score = ref(0)
const earnedPoints = ref(0)
const totalPoints = ref(0)
const passed = ref(false)

const allQuestionsAnswered = computed(() => {
  if (!test.value) return false
  return test.value.questions.every((q, index) => {
    const answer = answers.value[index]
    if (q.type === 'text') {
      return answer && answer.trim() !== ''
    } else if (q.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0
    } else {
      return answer !== undefined
    }
  })
})

function calculateScore() {
  if (!test.value) return

  let earned = 0
  let total = 0

  test.value.questions.forEach((question, qIndex) => {
    total += question.points
    const userAnswer = answers.value[qIndex]

    if (question.type === 'single') {
      if (question.correctAnswers.includes(userAnswer)) {
        earned += question.points
      }
    } else if (question.type === 'multiple') {
      const correctSet = new Set(question.correctAnswers)
      const answerSet = new Set(userAnswer || [])
      
      if (correctSet.size === answerSet.size && 
          [...correctSet].every(val => answerSet.has(val))) {
        earned += question.points
      }
    }
    // Text answers are not auto-graded
  })

  earnedPoints.value = earned
  totalPoints.value = total
  score.value = total > 0 ? Math.round((earned / total) * 100) : 0
  passed.value = score.value >= (test.value.passingScore || 70)
}

function submitTest() {
  calculateScore()
  showResults.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function retakeTest() {
  answers.value = {}
  showResults.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  if (id) {
    test.value = await testsApi.getById(id)
    
    // Initialize answers
    if (test.value) {
      test.value.questions.forEach((q, index) => {
        if (q.type === 'multiple') {
          answers.value[index] = []
        } else {
          answers.value[index] = undefined
        }
      })
    }
  }
  loading.value = false
})
</script>
