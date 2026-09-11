<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(card, index) in statCards"
        :key="index"
        class="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500 font-medium">{{ card.title }}</p>
            <p class="text-3xl font-bold text-slate-800 mt-1">{{ card.value }}</p>
          </div>
          <div :class="['w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center', card.color]">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="card.icon === 'file'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              <path v-if="card.icon === 'check'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-if="card.icon === 'clock'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-if="card.icon === 'image'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="flex items-center gap-1 mt-3">
          <svg v-if="card.up" class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
          <svg v-else class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
          <span :class="['text-sm font-medium', card.up ? 'text-emerald-500' : 'text-red-500']">
            {{ card.change }}
          </span>
          <span class="text-xs text-slate-400 ml-1">за месяц</span>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 class="font-semibold text-slate-800">Последняя активность</h3>
          </div>
          <router-link to="/pages" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Все действия
          </router-link>
        </div>
        <div class="divide-y divide-slate-50">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors"
          >
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center', getActivityColor(activity.action)]">
              <svg class="w-4 h-4" :class="getActivityIconColor(activity.action)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-slate-700">
                <span class="font-medium">{{ activity.user }}</span>
                <span class="text-slate-500"> {{ getActionText(activity.action) }} </span>
                <span class="font-medium text-slate-800">{{ activity.target }}</span>
              </p>
            </div>
            <span class="text-xs text-slate-400 whitespace-nowrap">{{ activity.time }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl border border-slate-200">
        <div class="p-5 border-b border-slate-100">
          <h3 class="font-semibold text-slate-800">Быстрые действия</h3>
        </div>
        <div class="p-5 space-y-3">
          <router-link
            to="/pages/new"
            class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div class="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-700">Новая страница</p>
              <p class="text-xs text-slate-400">Создать контент</p>
            </div>
          </router-link>
          <router-link
            to="/media"
            class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
          >
            <div class="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-700">Загрузить медиа</p>
              <p class="text-xs text-slate-400">Изображения, документы</p>
            </div>
          </router-link>
          <router-link
            to="/settings"
            class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
          >
            <div class="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-700">Настройки сайта</p>
              <p class="text-xs text-slate-400">Конфигурация CMS</p>
            </div>
          </router-link>
        </div>

        <!-- System Status -->
        <div class="p-5 border-t border-slate-100">
          <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Статус системы
          </h4>
          <div class="space-y-2.5">
            <div v-for="service in services" :key="service.name" class="flex items-center justify-between">
              <span class="text-sm text-slate-600">{{ service.name }}</span>
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="text-xs text-emerald-600 font-medium">{{ service.status }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { dashboardApi } from '../services/api'

const statCards = ref([
  { title: 'Всего страниц', value: 0, icon: 'file', color: 'from-blue-500 to-blue-600', change: '+12%', up: true },
  { title: 'Опубликовано', value: 0, icon: 'check', color: 'from-emerald-500 to-emerald-600', change: '+8%', up: true },
  { title: 'Черновики', value: 0, icon: 'clock', color: 'from-amber-500 to-amber-600', change: '-3%', up: false },
  { title: 'Медиафайлы', value: 0, icon: 'image', color: 'from-purple-500 to-purple-600', change: '+24%', up: true },
])

const activities = ref<any[]>([])

const services = [
  { name: 'API Server', status: 'Online' },
  { name: 'Database', status: 'Connected' },
  { name: 'Cache', status: 'Active' },
]

function getActivityColor(action: string): string {
  const colors: Record<string, string> = {
    created: 'bg-emerald-100',
    updated: 'bg-blue-100',
    deleted: 'bg-red-100',
    published: 'bg-amber-100',
  }
  return colors[action] || 'bg-slate-100'
}

function getActivityIconColor(action: string): string {
  const colors: Record<string, string> = {
    created: 'text-emerald-600',
    updated: 'text-blue-600',
    deleted: 'text-red-600',
    published: 'text-amber-600',
  }
  return colors[action] || 'text-slate-600'
}

function getActionText(action: string): string {
  const texts: Record<string, string> = {
    created: 'создал(а)',
    updated: 'обновил(а)',
    deleted: 'удалил(а)',
    published: 'опубликовал(а)',
  }
  return texts[action] || action
}

onMounted(async () => {
  const stats = await dashboardApi.getStats()
  statCards.value[0].value = stats.totalPages
  statCards.value[1].value = stats.publishedPages
  statCards.value[2].value = stats.draftPages
  statCards.value[3].value = stats.totalMedia
  activities.value = stats.recentActivity.map(a => ({
    ...a,
    time: formatTimeAgo(a.timestamp)
  }))
})

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
</script>
