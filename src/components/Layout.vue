<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center h-16 px-4 border-b border-slate-700">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div v-if="!collapsed">
            <h1 class="text-sm font-bold tracking-wide">Enterprise CMS</h1>
            <p class="text-[10px] text-slate-400">Vue 3 + ASP.NET Core</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 px-2 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
            isActive(item.path)
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="text-sm font-medium">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- System Info -->
      <div v-if="!collapsed" class="px-4 py-3 border-t border-slate-700">
        <div class="flex items-center gap-2 text-xs text-slate-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>ASP.NET Core 8.0</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          <span>PostgreSQL 16</span>
        </div>
      </div>

      <!-- Toggle Button -->
      <button
        @click="collapsed = !collapsed"
        class="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
      >
        <svg v-if="collapsed" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>

    <!-- Main Content -->
    <div :class="['transition-all duration-300', collapsed ? 'ml-16' : 'ml-64']">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
        <div>
          <h2 class="text-lg font-semibold text-slate-800">{{ pageTitle }}</h2>
          <p class="text-xs text-slate-500">Система управления контентом</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative hidden md:block">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Поиск..."
              class="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <!-- Notifications -->
          <button class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <!-- Profile -->
          <div class="flex items-center gap-2 pl-3 pr-2 py-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-slate-700">Администратор</p>
              <p class="text-xs text-slate-400">admin@company.ru</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const collapsed = ref(false)
const route = useRoute()

const navItems = [
  { path: '/', label: 'Дашборд', icon: 'DashboardIcon' },
  { path: '/pages', label: 'Страницы', icon: 'PagesIcon' },
  { path: '/media', label: 'Медиа', icon: 'MediaIcon' },
  { path: '/users', label: 'Пользователи', icon: 'UsersIcon' },
  { path: '/settings', label: 'Настройки', icon: 'SettingsIcon' },
]

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': 'Дашборд',
    '/pages': 'Страницы',
    '/media': 'Медиа-библиотека',
    '/users': 'Пользователи',
    '/settings': 'Настройки',
  }
  return titles[route.path] || 'Enterprise CMS'
})

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
