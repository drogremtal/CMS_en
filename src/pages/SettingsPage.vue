<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Настройки</h1>
        <p class="text-sm text-slate-500 mt-1">Конфигурация системы управления контентом</p>
      </div>
      <button
        @click="handleSave"
        :class="[
          'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all',
          saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
        ]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        {{ saved ? 'Сохранено!' : 'Сохранить изменения' }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Navigation -->
      <div class="bg-white rounded-xl border border-slate-200 p-2 h-fit">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            activeSection === section.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          {{ section.label }}
        </button>
      </div>

      <!-- Content -->
      <div class="lg:col-span-3 space-y-4">
        <!-- General -->
        <div v-if="activeSection === 'general'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">Общие настройки</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Название сайта</label>
              <input type="text" value="Enterprise CMS" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">URL сайта</label>
              <input type="text" value="https://company.ru" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Email администратора</label>
              <input type="email" value="admin@company.ru" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Язык по умолчанию</label>
              <select class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Русский</option>
                <option>English</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Описание сайта</label>
            <textarea value="Корпоративная система управления контентом" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"></textarea>
          </div>
        </div>

        <!-- Security -->
        <div v-if="activeSection === 'security'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">Безопасность</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">Двухфакторная аутентификация</p>
                <p class="text-xs text-slate-500 mt-0.5">Дополнительная защита аккаунта</p>
              </div>
              <span class="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200">Включено</span>
            </div>
            <div class="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">CAPTCHA при входе</p>
                <p class="text-xs text-slate-500 mt-0.5">Защита от брутфорс-атак</p>
              </div>
              <span class="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200">Включено</span>
            </div>
            <div class="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">Автоматический выход</p>
                <p class="text-xs text-slate-500 mt-0.5">Через 30 минут неактивности</p>
              </div>
              <span class="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">Настроить</span>
            </div>
          </div>
        </div>

        <!-- Database -->
        <div v-if="activeSection === 'database'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">База данных</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Тип БД</label>
              <select class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>PostgreSQL 16</option>
                <option>MS SQL Server 2022</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Хост</label>
              <input type="text" value="localhost" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Порт</label>
              <input type="text" value="5432" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Имя базы данных</label>
              <input type="text" value="enterprise_cms" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- System -->
        <div v-if="activeSection === 'system'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">Системная информация</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">Backend Framework</p>
              <p class="text-sm font-semibold text-slate-800">ASP.NET Core 8.0</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">Frontend Framework</p>
              <p class="text-sm font-semibold text-slate-800">Vue.js 3.4</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">База данных</p>
              <p class="text-sm font-semibold text-slate-800">PostgreSQL 16.1</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">Версия CMS</p>
              <p class="text-sm font-semibold text-slate-800">2.1.0 (Build 2024.01)</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">Сервер</p>
              <p class="text-sm font-semibold text-slate-800">Kestrel / IIS</p>
            </div>
            <div class="p-4 border border-slate-200 rounded-lg">
              <p class="text-xs text-slate-500 mb-1">Кэш</p>
              <p class="text-sm font-semibold text-slate-800">Redis 7.2</p>
            </div>
          </div>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p class="text-sm font-medium text-amber-800">Доступно обновление</p>
            <p class="text-xs text-amber-600 mt-1">Версия 2.2.0 доступна для установки. Рекомендуется обновиться для получения последних исправлений безопасности.</p>
            <button class="mt-3 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700">Обновить сейчас</button>
          </div>
        </div>

        <!-- Default for other tabs -->
        <div v-if="activeSection === 'appearance' || activeSection === 'email'" class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">
            {{ activeSection === 'appearance' ? 'Внешний вид' : 'Настройки email' }}
          </h3>
          <p class="text-sm text-slate-500">Раздел в разработке. Конфигурация будет доступна в следующей версии.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeSection = ref('general')
const saved = ref(false)

const sections = [
  { id: 'general', label: 'Общие' },
  { id: 'appearance', label: 'Внешний вид' },
  { id: 'email', label: 'Email' },
  { id: 'security', label: 'Безопасность' },
  { id: 'database', label: 'База данных' },
  { id: 'system', label: 'Система' },
]

function handleSave() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>
