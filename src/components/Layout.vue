<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="p-6 border-b border-slate-700">
        <h1 class="text-xl font-bold">Enterprise CMS</h1>
        <p class="text-xs text-slate-400 mt-1">Vue 3 + ASP.NET Core</p>
      </div>
      
      <nav class="flex-1 p-4 space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
          :class="{ 'bg-blue-600': $route.path === item.path }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-slate-700">
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Выйти</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-slate-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-slate-800">{{ pageTitle }}</h2>
          <div class="flex items-center gap-4">
            <button class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                А
              </div>
              <div>
                <p class="text-sm font-medium text-slate-800">Администратор</p>
                <p class="text-xs text-slate-500">admin@company.ru</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { path: '/', label: 'Дашборд', icon: 'DashboardIcon' },
  { path: '/pages', label: 'Страницы', icon: 'PagesIcon' },
  { path: '/media', label: 'Медиа', icon: 'MediaIcon' },
  { path: '/users', label: 'Пользователи', icon: 'UsersIcon' },
  { path: '/roles', label: 'Роли', icon: 'RolesIcon' },
  { path: '/tests', label: 'Тесты', icon: 'TestsIcon' },
  { path: '/helpdesk', label: 'HelpDesk', icon: 'HelpDeskIcon' },
  { path: '/api-docs', label: 'API', icon: 'ApiIcon' },
  { path: '/settings', label: 'Настройки', icon: 'SettingsIcon' },
]

const pageTitle = computed(() => {
  const item = menuItems.find(i => i.path === route.path)
  return item?.label || 'Dashboard'
})
</script>
