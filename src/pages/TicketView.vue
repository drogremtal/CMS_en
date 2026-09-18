<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <router-link to="/helpdesk" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-xl font-bold text-slate-800">{{ ticket?.title || 'Загрузка...' }}</h1>
          <p class="text-sm text-slate-500">Тикет #{{ ticket?.id?.substring(0, 8) }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-if="ticket"
          v-model="ticket.status"
          @change="updateStatus"
          class="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="open">Открыт</option>
          <option value="in_progress">В работе</option>
          <option value="resolved">Решен</option>
          <option value="closed">Закрыт</option>
        </select>
      </div>
    </div>

    <div v-if="ticket" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Ticket Info -->
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Описание</h3>
          <p class="text-slate-600 whitespace-pre-wrap">{{ ticket.description }}</p>
        </div>

        <!-- Comments -->
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Комментарии ({{ ticket.comments.length }})</h3>
          
          <div class="space-y-4 mb-6">
            <div
              v-for="comment in ticket.comments"
              :key="comment.id"
              :class="['p-4 rounded-lg', comment.isInternal ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50']"
            >
              <div class="flex items-start justify-between mb-2">
                <div>
                  <p class="text-sm font-medium text-slate-800">{{ comment.author }}</p>
                  <p class="text-xs text-slate-500">{{ formatDate(comment.createdAt) }}</p>
                </div>
                <span v-if="comment.isInternal" class="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs rounded">
                  Внутренний
                </span>
              </div>
              <p class="text-sm text-slate-600">{{ comment.content }}</p>
            </div>
          </div>

          <!-- Add Comment -->
          <div class="border-t border-slate-200 pt-4">
            <textarea
              v-model="newComment"
              placeholder="Добавить комментарий..."
              rows="3"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div class="flex items-center justify-between mt-3">
              <label class="flex items-center gap-2">
                <input
                  v-model="isInternal"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 rounded"
                />
                <span class="text-sm text-slate-600">Внутренний комментарий</span>
              </label>
              <button
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Details -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-semibold text-slate-800 mb-4">Детали</h3>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-slate-500 mb-1">Статус</p>
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', getStatusClass(ticket.status)]">
                {{ getStatusLabel(ticket.status) }}
              </span>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Приоритет</p>
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', getPriorityClass(ticket.priority)]">
                {{ getPriorityLabel(ticket.priority) }}
              </span>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Категория</p>
              <p class="text-sm text-slate-700">{{ ticket.category }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Заявитель</p>
              <p class="text-sm text-slate-700">{{ ticket.reporter }}</p>
              <p class="text-xs text-slate-500">{{ ticket.reporterEmail }}</p>
            </div>
            <div v-if="ticket.assignee">
              <p class="text-xs text-slate-500 mb-1">Исполнитель</p>
              <p class="text-sm text-slate-700">{{ ticket.assignee }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Создан</p>
              <p class="text-sm text-slate-700">{{ formatDate(ticket.createdAt) }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-1">Обновлен</p>
              <p class="text-sm text-slate-700">{{ formatDate(ticket.updatedAt) }}</p>
            </div>
            <div v-if="ticket.resolvedAt">
              <p class="text-xs text-slate-500 mb-1">Решен</p>
              <p class="text-sm text-slate-700">{{ formatDate(ticket.resolvedAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <h3 class="font-semibold text-slate-800 mb-4">Действия</h3>
          <div class="space-y-2">
            <button
              @click="updatePriority"
              class="w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left"
            >
              Изменить приоритет
            </button>
            <button
              @click="updateCategory"
              class="w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left"
            >
              Изменить категорию
            </button>
            <button
              @click="deleteTicket"
              class="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              Удалить тикет
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ticketsApi } from '../services/api'
import type { Ticket } from '../types'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const ticket = ref<Ticket | null>(null)
const newComment = ref('')
const isInternal = ref(false)

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
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function updateStatus() {
  if (ticket.value) {
    await ticketsApi.update(ticket.value.id, { status: ticket.value.status })
  }
}

async function addComment() {
  if (!ticket.value || !newComment.value.trim()) return
  
  await ticketsApi.addComment(ticket.value.id, {
    author: 'Администратор',
    authorEmail: 'admin@company.ru',
    content: newComment.value,
    isInternal: isInternal.value,
  })
  
  newComment.value = ''
  isInternal.value = false
  await loadTicket()
}

async function updatePriority() {
  if (!ticket.value) return
  const priorities = ['low', 'medium', 'high', 'urgent']
  const currentIndex = priorities.indexOf(ticket.value.priority)
  const nextPriority = priorities[(currentIndex + 1) % priorities.length] as any
  
  await ticketsApi.update(ticket.value.id, { priority: nextPriority })
  await loadTicket()
}

async function updateCategory() {
  if (!ticket.value) return
  const newCategory = prompt('Введите новую категорию:', ticket.value.category)
  if (newCategory) {
    await ticketsApi.update(ticket.value.id, { category: newCategory })
    await loadTicket()
  }
}

async function deleteTicket() {
  if (!ticket.value) return
  if (confirm('Удалить этот тикет?')) {
    await ticketsApi.delete(ticket.value.id)
    router.push('/helpdesk')
  }
}

async function loadTicket() {
  ticket.value = await ticketsApi.getById(id)
}

onMounted(loadTicket)
</script>
