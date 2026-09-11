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
      <div
        v-for="role in roles"
        :key="role.id"
        class="bg-white rounded-xl border border-slate-200 p-5"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ backgroundColor: role.color + '20' }">
            <div class="w-5 h-5 rounded" :style="{ backgroundColor: role.color }"></div>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-800">{{ getUserCount(role.id) }}</p>
            <p class="text-sm text-slate-500">{{ role.name }}</p>
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
              <span :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', getRoleClass(user.roleId)]">
                {{ getRoleLabel(user.roleId) }}
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
        <div
          v-for="role in roles"
          :key="role.id"
          class="p-4 rounded-lg border"
          :style="{ borderColor: role.color + '40', backgroundColor: role.color + '08' }"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-5 h-5 rounded" :style="{ backgroundColor: role.color }"></div>
            <span class="font-medium text-slate-800">{{ role.name }}</span>
          </div>
          <p class="text-xs text-slate-600">{{ role.description }}</p>
          <p class="text-xs text-slate-400 mt-2">{{ role.permissions.length }} прав доступа</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { rolesApi } from '../services/api'
import type { Role } from '../types'

const roles = ref<Role[]>([])

const users = ref([
  { id: '1', name: 'Иванов Алексей', email: 'ivanov@company.ru', roleId: 'admin', lastActive: '2 мин назад', status: 'active' },
  { id: '2', name: 'Петрова Мария', email: 'petrova@company.ru', roleId: 'editor', lastActive: '1 час назад', status: 'active' },
  { id: '3', name: 'Сидоров Дмитрий', email: 'sidorov@company.ru', roleId: 'editor', lastActive: '3 часа назад', status: 'active' },
  { id: '4', name: 'Козлова Анна', email: 'kozlova@company.ru', roleId: 'viewer', lastActive: '1 день назад', status: 'active' },
  { id: '5', name: 'Морозов Игорь', email: 'morozov@company.ru', roleId: 'viewer', lastActive: '5 дней назад', status: 'inactive' },
])

onMounted(async () => {
  roles.value = await rolesApi.getAll()
})

function getRoleLabel(roleId: string): string {
  const role = roles.value.find(r => r.id === roleId)
  return role?.name || roleId
}

function getRoleClass(roleId: string): string {
  const role = roles.value.find(r => r.id === roleId)
  if (!role) return 'bg-slate-50 text-slate-600 border-slate-200'
  
  const colorMap: Record<string, string> = {
    '#ef4444': 'bg-red-50 text-red-700 border-red-200',
    '#3b82f6': 'bg-blue-50 text-blue-700 border-blue-200',
    '#64748b': 'bg-slate-50 text-slate-600 border-slate-200',
  }
  return colorMap[role.color] || 'bg-slate-50 text-slate-600 border-slate-200'
}

function getUserCount(roleId: string): number {
  return users.value.filter(u => u.roleId === roleId).length
}
</script>
