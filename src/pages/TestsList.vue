<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Тесты</h1>
        <p class="text-sm text-slate-500 mt-1">
          Создание и управление тестами • {{ tests.length }} тестов
        </p>
      </div>
      <router-link
        to="/tests/new"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Новый тест
      </router-link>
    </div>

    <!-- Tests List -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Название</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Вопросов</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Длительность</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Статус</th>
            <th class="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Доступ</th>
            <th class="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="test in tests" :key="test.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-5 py-4">
              <div>
                <p class="text-sm font-medium text-slate-800">{{ test.title }}</p>
                <p class="text-xs text-slate-400 mt-0.5">{{ test.description }}</p>
              </div>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-sm text-slate-600">{{ test.questions.length }}</span>
            </td>
            <td class="px-5 py-4 hidden md:table-cell">
              <span class="text-sm text-slate-600">{{ test.duration }} мин</span>
            </td>
            <td class="px-5 py-4">
              <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClass(test.status)]">
                {{ getStatusLabel(test.status) }}
              </span>
            </td>
            <td class="px-5 py-4 hidden lg:table-cell">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="roleId in test.allowedRoles.slice(0, 2)"
                  :key="roleId"
                  class="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs rounded"
                >
                  {{ getRoleName(roleId) }}
                </span>
                <span v-if="test.allowedRoles.length > 2" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                  +{{ test.allowedRoles.length - 2 }}
                </span>
              </div>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="relative inline-block">
                <button @click="toggleMenu(test.id)" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <div
                  v-if="openMenu === test.id"
                  class="absolute right-0 top-8 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1"
                >
                  <router-link
                    :to="`/tests/edit/${test.id}`"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Редактировать
                  </router-link>
                  <div class="border-t border-slate-100 my-1"></div>
                  <button
                    @click="handleDelete(test.id)"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Удалить
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="tests.length === 0" class="text-center py-12">
        <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-slate-500 font-medium">Тесты не найдены</p>
        <p class="text-sm text-slate-400 mt-1">Создайте первый тест</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { testsApi, rolesApi } from '../services/api'
import type { Test, Role } from '../types'

const tests = ref<Test[]>([])
const roles = ref<Role[]>([])
const openMenu = ref<string | null>(null)

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = { published: 'Опубликован', draft: 'Черновик', archived: 'В архиве' }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-amber-50 text-amber-700 border-amber-200',
    archived: 'bg-slate-50 text-slate-600 border-slate-200',
  }
  return classes[status] || ''
}

function getRoleName(roleId: string): string {
  const role = roles.value.find(r => r.id === roleId)
  return role?.name || roleId
}

function toggleMenu(id: string) {
  openMenu.value = openMenu.value === id ? null : id
}

async function handleDelete(id: string) {
  if (confirm('Вы уверены, что хотите удалить этот тест?')) {
    await testsApi.delete(id)
    await loadTests()
  }
  openMenu.value = null
}

async function loadTests() {
  tests.value = await testsApi.getAll()
  roles.value = await rolesApi.getAll()
}

onMounted(loadTests)
</script>
