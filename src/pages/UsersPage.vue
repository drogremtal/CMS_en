<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Пользователи</h1>
        <p class="text-sm text-slate-500 mt-1">
          Управление доступом и ролями • {{ users.length }} пользователей
        </p>
      </div>
      <button class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Добавить пользователя
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">1</p>
            <p class="text-sm text-slate-500">Администраторов</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">2</p>
            <p class="text-sm text-slate-500">Редакторов</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">2</p>
            <p class="text-sm text-slate-500">Наблюдателей</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Пользователь</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Роль</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Статус</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Последняя активность</th>
            <th class="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-medium text-slate-600">
                  {{ user.name.split(' ').map(n => n[0]).join('') }}
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-800">{{ user.name }}</p>
                  <p class="text-xs text-slate-400 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ user.email }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4">
              <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', getRoleClass(user.role)]">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', user.status === 'active' ? 'text-emerald-600' : 'text-slate-400']">
                <span :class="['w-2 h-2 rounded-full', user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300']"></span>
                {{ user.status === 'active' ? 'Активен' : 'Неактивен' }}
              </span>
            </td>
            <td class="px-5 py-4 hidden lg:table-cell">
              <span class="text-sm text-slate-500">{{ user.lastActive }}</span>
            </td>
            <td class="px-5 py-4 text-right">
              <button class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Roles Info -->
    <div class="bg-white rounded-xl border border-slate-200 p-5">
      <h3 class="font-semibold text-slate-800 mb-4">Описание ролей</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-lg border border-red-100 bg-red-50/50">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span class="font-medium text-slate-800">Администратор</span>
          </div>
          <p class="text-xs text-slate-600">Полный доступ ко всем функциям CMS, включая управление пользователями и настройками системы.</p>
        </div>
        <div class="p-4 rounded-lg border border-blue-100 bg-blue-50/50">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span class="font-medium text-slate-800">Редактор</span>
          </div>
          <p class="text-xs text-slate-600">Может создавать, редактировать и публиковать страницы. Управление медиа-библиотекой.</p>
        </div>
        <div class="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="font-medium text-slate-800">Наблюдатель</span>
          </div>
          <p class="text-xs text-slate-600">Доступ только для просмотра контента. Не может вносить изменения.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { id: '1', name: 'Иванов Алексей', email: 'ivanov@company.ru', role: 'admin', lastActive: '2 мин назад', status: 'active' },
  { id: '2', name: 'Петрова Мария', email: 'petrova@company.ru', role: 'editor', lastActive: '1 час назад', status: 'active' },
  { id: '3', name: 'Сидоров Дмитрий', email: 'sidorov@company.ru', role: 'editor', lastActive: '3 часа назад', status: 'active' },
  { id: '4', name: 'Козлова Анна', email: 'kozlova@company.ru', role: 'viewer', lastActive: '1 день назад', status: 'active' },
  { id: '5', name: 'Морозов Игорь', email: 'morozov@company.ru', role: 'viewer', lastActive: '5 дней назад', status: 'inactive' },
])

function getRoleLabel(role: string): string {
  const labels: Record<string, string> = { admin: 'Администратор', editor: 'Редактор', viewer: 'Наблюдатель' }
  return labels[role] || role
}

function getRoleClass(role: string): string {
  const classes: Record<string, string> = {
    admin: 'bg-red-50 text-red-700 border-red-200',
    editor: 'bg-blue-50 text-blue-700 border-blue-200',
    viewer: 'bg-slate-50 text-slate-600 border-slate-200',
  }
  return classes[role] || ''
}
</script>
