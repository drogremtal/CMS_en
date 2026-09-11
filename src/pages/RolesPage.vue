<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Управление ролями</h1>
        <p class="text-sm text-slate-500 mt-1">
          Создание и настройка ролей пользователей • {{ roles.length }} ролей
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Новая роль
      </button>
    </div>

    <!-- Roles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="role in roles"
        :key="role.id"
        class="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: role.color + '20' }"
            >
              <svg
                class="w-5 h-5"
                :style="{ color: role.color }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-slate-800">{{ role.name }}</h3>
              <p class="text-xs text-slate-500">{{ role.description }}</p>
            </div>
          </div>
          <div v-if="role.isSystem" class="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
            Системная
          </div>
        </div>

        <div class="mb-4">
          <p class="text-xs font-medium text-slate-600 mb-2">Права доступа:</p>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="perm in role.permissions.slice(0, 5)"
              :key="perm"
              class="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs rounded"
            >
              {{ formatPermission(perm) }}
            </span>
            <span
              v-if="role.permissions.length > 5"
              class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
            >
              +{{ role.permissions.length - 5 }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button
            @click="openEditModal(role)"
            class="flex-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Редактировать
          </button>
          <button
            v-if="!role.isSystem"
            @click="handleDelete(role.id)"
            class="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-slate-200">
          <h2 class="text-xl font-bold text-slate-800">
            {{ editingRole ? 'Редактировать роль' : 'Создать новую роль' }}
          </h2>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Название роли</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Например: Менеджер контента"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Описание</label>
            <textarea
              v-model="formData.description"
              placeholder="Описание роли и её назначение"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Цвет</label>
            <input
              v-model="formData.color"
              type="color"
              class="w-20 h-10 border border-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">Права доступа</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="group in permissionGroups"
                :key="group.name"
                class="p-3 border border-slate-200 rounded-lg"
              >
                <h4 class="text-sm font-semibold text-slate-700 mb-2">{{ group.name }}</h4>
                <div class="space-y-2">
                  <label
                    v-for="perm in group.permissions"
                    :key="perm.id"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="perm.id"
                      v-model="formData.permissions"
                      class="w-4 h-4 text-blue-600 rounded"
                    />
                    <span class="text-sm text-slate-600">{{ perm.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            @click="handleSave"
            :disabled="!formData.name"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ editingRole ? 'Сохранить' : 'Создать' }}
          </button>
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
const showModal = ref(false)
const editingRole = ref<Role | null>(null)

const formData = ref({
  name: '',
  description: '',
  color: '#3b82f6',
  permissions: [] as string[],
})

const permissionGroups = [
  {
    name: 'Страницы',
    permissions: [
      { id: 'pages.view', label: 'Просмотр' },
      { id: 'pages.create', label: 'Создание' },
      { id: 'pages.edit', label: 'Редактирование' },
      { id: 'pages.delete', label: 'Удаление' },
      { id: 'pages.publish', label: 'Публикация' },
    ],
  },
  {
    name: 'Медиа',
    permissions: [
      { id: 'media.view', label: 'Просмотр' },
      { id: 'media.upload', label: 'Загрузка' },
      { id: 'media.delete', label: 'Удаление' },
    ],
  },
  {
    name: 'Пользователи',
    permissions: [
      { id: 'users.view', label: 'Просмотр' },
      { id: 'users.manage', label: 'Управление' },
    ],
  },
  {
    name: 'Роли',
    permissions: [
      { id: 'roles.view', label: 'Просмотр' },
      { id: 'roles.manage', label: 'Управление' },
    ],
  },
  {
    name: 'Тесты',
    permissions: [
      { id: 'tests.view', label: 'Просмотр' },
      { id: 'tests.create', label: 'Создание' },
      { id: 'tests.edit', label: 'Редактирование' },
      { id: 'tests.delete', label: 'Удаление' },
    ],
  },
  {
    name: 'Настройки',
    permissions: [
      { id: 'settings.view', label: 'Просмотр' },
      { id: 'settings.edit', label: 'Редактирование' },
    ],
  },
]

function formatPermission(perm: string): string {
  const parts = perm.split('.')
  return parts[1] || perm
}

function openCreateModal() {
  editingRole.value = null
  formData.value = {
    name: '',
    description: '',
    color: '#3b82f6',
    permissions: [],
  }
  showModal.value = true
}

function openEditModal(role: Role) {
  editingRole.value = role
  formData.value = {
    name: role.name,
    description: role.description,
    color: role.color,
    permissions: [...role.permissions],
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingRole.value = null
}

async function handleSave() {
  if (editingRole.value) {
    await rolesApi.update(editingRole.value.id, formData.value)
  } else {
    await rolesApi.create({
      ...formData.value,
      isSystem: false,
    })
  }
  closeModal()
  await loadRoles()
}

async function handleDelete(id: string) {
  if (confirm('Вы уверены, что хотите удалить эту роль?')) {
    await rolesApi.delete(id)
    await loadRoles()
  }
}

async function loadRoles() {
  roles.value = await rolesApi.getAll()
}

onMounted(loadRoles)
</script>
