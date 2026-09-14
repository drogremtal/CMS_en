<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-slate-800 mb-3">Служба поддержки</h1>
      <p class="text-lg text-slate-600">Создайте обращение, и мы свяжемся с вами в ближайшее время</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="border-b border-slate-200">
        <nav class="flex">
          <button
            @click="activeTab = 'create'"
            :class="[
              'flex-1 px-6 py-4 text-sm font-medium transition-colors',
              activeTab === 'create'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            ]"
          >
            Создать обращение
          </button>
          <button
            @click="activeTab = 'track'"
            :class="[
              'flex-1 px-6 py-4 text-sm font-medium transition-colors',
              activeTab === 'track'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            ]"
          >
            Отследить статус
          </button>
        </nav>
      </div>

      <!-- Create Tab -->
      <div v-if="activeTab === 'create'" class="p-6">
        <form @submit.prevent="createTicket" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Тема обращения *</label>
            <input
              v-model="newTicket.title"
              type="text"
              required
              placeholder="Кратко опишите проблему или вопрос"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Описание *</label>
            <textarea
              v-model="newTicket.description"
              required
              rows="6"
              placeholder="Подробно опишите вашу проблему или вопрос. Укажите все необходимые детали."
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Категория</label>
              <select
                v-model="newTicket.category"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="cat in settings.categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Приоритет</label>
              <select
                v-model="newTicket.priority"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
                <option value="urgent">Срочный</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Ваше имя *</label>
              <input
                v-model="newTicket.reporter"
                type="text"
                required
                placeholder="Иван Иванов"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
              <input
                v-model="newTicket.reporterEmail"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-200">
            <p class="text-xs text-slate-500">
              * Обязательные поля
            </p>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отправить обращение
            </button>
          </div>
        </form>
      </div>

      <!-- Track Tab -->
      <div v-if="activeTab === 'track'" class="p-6">
        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-2">ID тикета</label>
          <div class="flex gap-3">
            <input
              v-model="trackingId"
              type="text"
              placeholder="Введите ID тикета (например: abc12345)"
              class="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="trackTicket"
              :disabled="!trackingId"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Найти
            </button>
          </div>
        </div>

        <!-- Ticket Status -->
        <div v-if="trackedTicket" class="border border-slate-200 rounded-lg p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-800 mb-1">{{ trackedTicket.title }}</h3>
              <p class="text-sm text-slate-500">ID: {{ trackedTicket.id.substring(0, 8) }}</p>
            </div>
            <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusClass(trackedTicket.status)]">
              {{ getStatusLabel(trackedTicket.status) }}
            </span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p class="text-xs text-slate-500 mb-1">Приоритет</p>
              <span :class="['px-2.5 py-1 rounded-full text-xs font-medium', getPriorityClass(trackedTicket.priority)]">
                {{ getPriorityLabel(trackedTicket.priority) }}
              </span>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Категория</p>
              <p class="text-sm text-slate-700">{{ trackedTicket.category }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Создан</p>
              <p class="text-sm text-slate-700">{{ formatDate(trackedTicket.createdAt) }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Обновлен</p>
              <p class="text-sm text-slate-700">{{ formatDate(trackedTicket.updatedAt) }}</p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4">
            <h4 class="text-sm font-semibold text-slate-700 mb-3">Описание</h4>
            <p class="text-sm text-slate-600 whitespace-pre-wrap">{{ trackedTicket.description }}</p>
          </div>

          <div v-if="trackedTicket.comments.length > 0" class="border-t border-slate-200 pt-4 mt-4">
            <h4 class="text-sm font-semibold text-slate-700 mb-3">Ответы ({{ trackedTicket.comments.length }})</h4>
            <div class="space-y-3">
              <div
                v-for="comment in trackedTicket.comments.filter(c => !c.isInternal)"
                :key="comment.id"
                class="bg-slate-50 rounded-lg p-4"
              >
                <div class="flex items-start justify-between mb-2">
                  <p class="text-sm font-medium text-slate-800">{{ comment.author }}</p>
                  <p class="text-xs text-slate-500">{{ formatDate(comment.createdAt) }}</p>
                </div>
                <p class="text-sm text-slate-600">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="trackingAttempted" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-slate-500">Тикет не найден</p>
          <p class="text-sm text-slate-400 mt-1">Проверьте правильность ID</p>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-emerald-800 mb-1">Обращение успешно создано!</h3>
          <p class="text-sm text-emerald-700 mb-3">
            Ваш тикет зарегистрирован под номером:
          </p>
          <div class="bg-white rounded-lg px-4 py-3 border border-emerald-200 inline-block">
            <p class="text-lg font-mono font-bold text-emerald-800">{{ createdTicketId }}</p>
          </div>
          <p class="text-sm text-emerald-700 mt-3">
            Сохраните этот номер для отслеживания статуса обращения.
          </p>
          <button
            @click="trackCreatedTicket"
            class="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Отследить статус
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ticketsApi, helpdeskSettingsApi } from '../services/api'
import type { Ticket, HelpDeskSettings } from '../types'

const activeTab = ref<'create' | 'track'>('create')
const settings = ref<HelpDeskSettings>({
  enabled: false,
  defaultPriority: 'medium',
  defaultCategory: 'Общий вопрос',
  categories: [],
  autoAssign: false,
  emailNotifications: true,
  slaEnabled: false,
  slaResponseTime: 24,
  slaResolutionTime: 72,
})

const newTicket = ref({
  title: '',
  description: '',
  priority: 'medium' as const,
  category: '',
  reporter: '',
  reporterEmail: '',
})

const trackingId = ref('')
const trackedTicket = ref<Ticket | null>(null)
const trackingAttempted = ref(false)
const showSuccess = ref(false)
const createdTicketId = ref('')

const isFormValid = computed(() => {
  return newTicket.value.title.trim() !== '' &&
         newTicket.value.description.trim() !== '' &&
         newTicket.value.reporter.trim() !== '' &&
         newTicket.value.reporterEmail.trim() !== ''
})

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    open: 'Открыт',
    in_progress: 'В работе',
    resolved: 'Решен',
    closed: 'Закрыт',
  }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-amber-100 text-amber-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-slate-100 text-slate-600',
  }
  return classes[status] || ''
}

function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    urgent: 'Срочный',
  }
  return labels[priority] || priority
}

function getPriorityClass(priority: string): string {
  const classes: Record<string, string> = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
  }
  return classes[priority] || ''
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function createTicket() {
  const ticket = await ticketsApi.create({
    ...newTicket.value,
    status: 'open',
  })

  createdTicketId.value = ticket.id.substring(0, 8)
  showSuccess.value = true

  // Reset form
  newTicket.value = {
    title: '',
    description: '',
    priority: settings.value.defaultPriority as any,
    category: settings.value.defaultCategory,
    reporter: '',
    reporterEmail: '',
  }
}

async function trackTicket() {
  trackingAttempted.value = true
  const allTickets = await ticketsApi.getAll()
  trackedTicket.value = allTickets.find(t => t.id.startsWith(trackingId.value)) || null
}

function trackCreatedTicket() {
  trackingId.value = createdTicketId.value
  activeTab.value = 'track'
  trackTicket()
  showSuccess.value = false
}

onMounted(async () => {
  settings.value = await helpdeskSettingsApi.get()
  newTicket.value.priority = settings.value.defaultPriority as any
  newTicket.value.category = settings.value.defaultCategory
})
</script>
