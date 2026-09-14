<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <router-link to="/tests" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-xl font-bold text-slate-800">{{ isNew ? 'Новый тест' : 'Редактирование теста' }}</h1>
          <p class="text-sm text-slate-500">{{ isNew ? 'Создание нового теста' : test.title }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="handleSave('draft')"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Сохранение...' : 'Сохранить черновик' }}
        </button>
        <button
          @click="handleSave('published')"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
        >
          Опубликовать
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Test Info -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Название теста</label>
            <input
              v-model="test.title"
              type="text"
              placeholder="Введите название теста"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Описание</label>
            <textarea
              v-model="test.description"
              placeholder="Описание теста"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
            ></textarea>
          </div>
        </div>

        <!-- Questions -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-slate-800">Вопросы ({{ test.questions.length }})</h3>
            <button
              @click="addQuestion"
              class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Добавить вопрос
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(question, qIndex) in test.questions"
              :key="question.id"
              class="p-4 border border-slate-200 rounded-lg"
            >
              <div class="flex items-start justify-between mb-3">
                <span class="text-sm font-medium text-slate-600">Вопрос {{ qIndex + 1 }}</span>
                <button
                  @click="removeQuestion(qIndex)"
                  class="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="space-y-3">
                <input
                  v-model="question.text"
                  type="text"
                  placeholder="Текст вопроса"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div class="flex items-center gap-3">
                  <select
                    v-model="question.type"
                    class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Один ответ</option>
                    <option value="multiple">Несколько ответов</option>
                    <option value="text">Текстовый ответ</option>
                  </select>
                  <input
                    v-model.number="question.points"
                    type="number"
                    min="1"
                    class="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Баллы"
                  />
                </div>

                <div v-if="question.type !== 'text'" class="space-y-2">
                  <div
                    v-for="(option, oIndex) in question.options"
                    :key="oIndex"
                    class="flex items-center gap-2"
                  >
                    <input
                      :type="question.type === 'single' ? 'radio' : 'checkbox'"
                      :checked="question.correctAnswers.includes(oIndex)"
                      @change="toggleCorrectAnswer(qIndex, oIndex)"
                      class="w-4 h-4 text-blue-600"
                    />
                    <input
                      v-model="question.options[oIndex]"
                      type="text"
                      :placeholder="`Вариант ${oIndex + 1}`"
                      class="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      @click="removeOption(qIndex, oIndex)"
                      class="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <button
                    @click="addOption(qIndex)"
                    class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Добавить вариант
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 class="font-semibold text-slate-800">Настройки теста</h3>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Длительность (мин)</label>
            <input
              v-model.number="test.duration"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Проходной балл (%)</label>
            <input
              v-model.number="test.passingScore"
              type="number"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Статус</label>
            <select
              v-model="test.status"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Черновик</option>
              <option value="published">Опубликован</option>
              <option value="archived">В архиве</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Привязать к странице</label>
            <select
              v-model="test.linkedPageId"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Не привязан</option>
              <option
                v-for="page in publishedPages"
                :key="page.id"
                :value="page.id"
              >
                {{ page.title }}
              </option>
            </select>
            <p class="text-xs text-slate-500 mt-1">Тест будет отображаться как подпункт меню этой страницы</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Доступ для ролей</label>
            <div class="space-y-2">
              <label
                v-for="role in allRoles"
                :key="role.id"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="role.id"
                  v-model="test.allowedRoles"
                  class="w-4 h-4 text-blue-600 rounded"
                />
                <span class="text-sm text-slate-600">{{ role.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { testsApi, rolesApi, pagesApi } from '../services/api'
import type { Test, Question, Role, Page } from '../types'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const isNew = id === 'new' || !id

const saving = ref(false)
const allRoles = ref<Role[]>([])
const publishedPages = ref<Page[]>([])

const test = ref<Partial<Test>>({
  title: '',
  description: '',
  questions: [],
  status: 'draft',
  author: 'Администратор',
  duration: 30,
  passingScore: 70,
  allowedRoles: [],
})

function addQuestion() {
  const newQuestion: Question = {
    id: uuidv4(),
    text: '',
    type: 'single',
    options: ['', ''],
    correctAnswers: [],
    points: 1,
  }
  test.value.questions!.push(newQuestion)
}

function removeQuestion(index: number) {
  test.value.questions!.splice(index, 1)
}

function addOption(qIndex: number) {
  test.value.questions![qIndex].options.push('')
}

function removeOption(qIndex: number, oIndex: number) {
  test.value.questions![qIndex].options.splice(oIndex, 1)
  // Remove from correct answers if exists
  const correctIndex = test.value.questions![qIndex].correctAnswers.indexOf(oIndex)
  if (correctIndex > -1) {
    test.value.questions![qIndex].correctAnswers.splice(correctIndex, 1)
  }
}

function toggleCorrectAnswer(qIndex: number, oIndex: number) {
  const question = test.value.questions![qIndex]
  const index = question.correctAnswers.indexOf(oIndex)

  if (question.type === 'single') {
    question.correctAnswers = [oIndex]
  } else {
    if (index > -1) {
      question.correctAnswers.splice(index, 1)
    } else {
      question.correctAnswers.push(oIndex)
    }
  }
}

async function handleSave(status?: string) {
  saving.value = true
  const testData = { ...test.value, status: status || test.value.status || 'draft' }

  if (isNew) {
    const created = await testsApi.create(testData as any)
    saving.value = false
    router.push(`/tests/edit/${created.id}`)
  } else {
    await testsApi.update(id, testData)
    saving.value = false
  }
}

onMounted(async () => {
  allRoles.value = await rolesApi.getAll()
  const allPages = await pagesApi.getAll()
  publishedPages.value = allPages.filter(p => p.status === 'published')
  if (!isNew && id) {
    const data = await testsApi.getById(id)
    if (data) test.value = data
  }
})
</script>
