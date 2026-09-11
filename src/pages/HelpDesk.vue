<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">HelpDesk</h1>
        <p class="text-sm text-slate-500 mt-1">
          Управление заявками и обращениями • {{ tickets.length }} тикетов
        </p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Новый тикет
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">{{ stats.open }}</p>
            <p class="text-sm text-slate-500">Открытых</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">{{ stats.inProgress }}</p>
            <p class="text-sm text-slate-500">В работе</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">{{ stats.resolved }}</p>
            <p class="text-sm text-slate-500">Решено</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">{{ stats.urgent }}</p>
            <p class="text-sm text-slate-500">Срочных</p>
          </div>
        </div>
      </div>
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
            placeholder="Поиск тикетов..."
            class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center gap-2">
          <select
            v-model="statusFilter"
            class="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все статусы</option>
            <option value="open">Открыт</option>
            <option value="in_progress">В работе</option>
            <option value="resolved">Решен</option>
            <option value="closed">Закрыт</option>
          </select>
          <select
            v-model="priorityFilter"
            class="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все приоритеты</option>
            <option value="urgent">Срочный</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tickets List -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Тикет</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Приоритет</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Категория</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Создан</th>
            <th class="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="hover:bg-slate-50 transition-colors cursor-pointer"
            @click="viewTicket(ticket.id)"
          >
            <td class="px-5 py-4">
              <div>
                <p class="text-sm font-medium text-slate-800">{{ ticket.title }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ ticket.reporter }}</p>
              </div>
            </td>
            <td class="px-5 py-4">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', getStatusClass(ticket.status)]">
                {{ getStatusLabel(ticket.status) }}
              </span>
            </td>
            <td class="px-5 py-4">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', getPriorityClass(ticket.priority)]">
                {{ getPriorityLabel(ticket.priority) }}
              </span>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-sm text-slate-600">{{ ticket.category }}</span>
            </td>
            <td class="px-5 py-4 hidden lg:table-cell">
              <span class="text-sm text-slate-500">{{ formatDate(ticket.createdAt) }}</span>
            </td>
            <td class="px-5 py-4 text-right">
              <button
                @click.stop="deleteTicket(ticket.id)"
                class="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredTickets.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-slate-500 font-medium">Тикеты не найдены</p>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateModal = false"
    >
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-slate-200">
          <h2 class="text-xl font-bold text-slate-800">Новый тикет</h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Заголовок</label>
            <input
              v-model="newTicket.title"
              type="text"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Описание</label>
            <textarea
              v-model="newTicket.description"
              rows="4"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Приоритет</label>
              <select
                v-model="newTicket.priority"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
                <option value="urgent">Срочный</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Категория</label>
              <select
                v-model="newTicket.category"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="cat in settings.categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Имя заявителя</label>
              <input
                v-model="newTicket.reporter"
                type="text"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                v-model="newTicket.reporterEmail"
                type="email"
                class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            @click="createTicket"
            :disabled="!newTicket.title || !newTicket.description"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ticketsApi, helpdeskSettingsApi } from '../services/api'
import type { Ticket, HelpDeskSettings } from '../types'

const router = useRouter()
const tickets = ref<Ticket[]>([])
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

const searchTerm = ref('')
const statusFilter = ref('all')
const priorityFilter = ref('all')
const showCreateModal = ref(false)

const newTicket = ref({
  title: '',
  description: '',
  priority: 'medium' as const,
  category: '',
  reporter: '',
  reporterEmail: '',
  status: 'open' as const,
})

const stats = computed(() => ({
  open: tickets.value.filter(t => t.status === 'open').length,
  inProgress: tickets.value.filter(t => t.status === 'in_progress').length,
  resolved: tickets.value.filter(t => t.status === 'resolved').length,
  urgent: tickets.value.filter(t => t.priority === 'urgent').length,
}))

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value
    const matchesPriority = priorityFilter.value === 'all' || ticket.priority === priorityFilter.value
    return matchesSearch && matchesStatus && matchesPriority
  })
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
    open: 'bg-blue-50 text-blue-700',
    in_progress: 'bg-amber-50 text-amber-700',
    resolved: 'bg-emerald-50 text-emerald-700',
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
    medium: 'bg-blue-50 text-blue-700',
    high: 'bg-orange-50 text-orange-700',
    urgent: 'bg-red-50 text-red-700',
  }
  return classes[priority] || ''
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function viewTicket(id: string) {
  router.push(`/helpdesk/${id}`)
}

async function createTicket() {
  await ticketsApi.create(newTicket.value)
  showCreateModal.value = false
  newTicket.value = {
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    reporter: '',
    reporterEmail: '',
    status: 'open',
  }
  await loadTickets()
}

async function deleteTicket(id: string) {
  if (confirm('Удалить этот тикет?')) {
    await ticketsApi.delete(id)
    await loadTickets()
  }
}

async function loadTickets() {
  tickets.value = await ticketsApi.getAll()
}

onMounted(async () => {
  settings.value = await helpdeskSettingsApi.get()
  newTicket.value.category = settings.value.defaultCategory
  newTicket.value.priority = settings.value.defaultPriority
  await loadTickets()
})
</script>
