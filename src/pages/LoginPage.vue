<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Enterprise CMS</h1>
        <p class="text-blue-200">Система управления контентом</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">Вход в систему</h2>

        <!-- OIDC Login -->
        <div v-if="oidcConfig.enabled" class="space-y-4">
          <button
            @click="handleOIDCLogin"
            :disabled="isLoading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Войти через {{ oidcConfig.provider }}</span>
          </button>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-slate-500">или</span>
            </div>
          </div>
        </div>

        <!-- Local Login -->
        <form @submit.prevent="handleLocalLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="admin@company.ru"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Пароль</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" />
              <span class="text-sm text-slate-600">Запомнить меня</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">Забыли пароль?</a>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-slate-50 rounded-lg">
          <p class="text-xs font-semibold text-slate-600 mb-2">Демо-доступ:</p>
          <div class="space-y-1 text-xs text-slate-500">
            <p><span class="font-medium">Админ:</span> admin@company.ru</p>
            <p><span class="font-medium">Редактор:</span> editor@company.ru</p>
            <p><span class="font-medium">Пароль:</span> любой</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-sm text-blue-200">
          Vue 3 + ASP.NET Core 8.0 + PostgreSQL
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useOIDC } from '../composables/useOIDC'

const router = useRouter()
const { init: initAuth } = useAuth()
const { oidcConfig, startOIDCLogin, isLoading } = useOIDC()

const email = ref('')
const password = ref('')
const error = ref('')

async function handleLocalLogin() {
  error.value = ''
  isLoading.value = true
  
  try {
    // Симуляция входа
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Определяем роль по email
    let roleId = 'viewer'
    let name = 'Пользователь'
    
    if (email.value === 'admin@company.ru') {
      roleId = 'admin'
      name = 'Администратор'
    } else if (email.value === 'editor@company.ru') {
      roleId = 'editor'
      name = 'Редактор'
    }
    
    // Сохраняем пользователя
    const user = {
      id: '1',
      name,
      email: email.value,
      roleId,
      lastLogin: new Date().toISOString()
    }
    
    localStorage.setItem('current_user', JSON.stringify(user))
    localStorage.setItem('cms_user', JSON.stringify(user))
    
    await initAuth()
    router.push('/')
  } catch (err) {
    error.value = 'Ошибка входа. Проверьте credentials.'
  } finally {
    isLoading.value = false
  }
}

async function handleOIDCLogin() {
  error.value = ''
  try {
    await startOIDCLogin()
    await initAuth()
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Ошибка OIDC авторизации'
  }
}

onMounted(() => {
  // Проверка, если уже авторизован
  const savedUser = localStorage.getItem('current_user')
  if (savedUser) {
    router.push('/')
  }
})
</script>
