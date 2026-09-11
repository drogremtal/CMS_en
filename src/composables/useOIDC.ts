import { ref, computed } from 'vue'
import { usersApi } from '../services/api'
import type { User, OIDCConfig } from '../types'

// Состояние авторизации
const currentUser = ref<User | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)

// OIDC конфигурация
const oidcConfig = ref<OIDCConfig>({
  enabled: false,
  provider: 'Azure AD',
  authority: 'https://login.microsoftonline.com/{tenant-id}',
  clientId: '',
  redirectUri: window.location.origin + '/auth/callback',
  scope: ['openid', 'profile', 'email'],
  roleClaim: 'role',
  roleMapping: {
    'admin': 'admin',
    'editor': 'editor',
    'viewer': 'viewer'
  },
  autoCreateUsers: true,
  defaultRoleId: 'viewer'
})

// Загрузка конфигурации из localStorage
function loadOIDCConfig() {
  const saved = localStorage.getItem('oidc_config')
  if (saved) {
    oidcConfig.value = JSON.parse(saved)
  }
}

// Сохранение конфигурации
function saveOIDCConfig(config: Partial<OIDCConfig>) {
  oidcConfig.value = { ...oidcConfig.value, ...config }
  localStorage.setItem('oidc_config', JSON.stringify(oidcConfig.value))
}

// Инициализация OIDC
async function initOIDC() {
  loadOIDCConfig()
  
  // Проверка сохраненной сессии
  const savedUser = localStorage.getItem('current_user')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
    isAuthenticated.value = true
  }
}

// Маппинг OIDC ролей на роли CMS
function mapOIDCRole(oidcRole: string): string {
  return oidcConfig.value.roleMapping[oidcRole] || oidcConfig.value.defaultRoleId
}

// Обработка OIDC callback
async function handleOIDCCallback(idToken: any) {
  isLoading.value = true
  
  try {
    // Извлечение информации из токена
    const email = idToken.email || idToken.preferred_username
    const name = idToken.name || email.split('@')[0]
    const oidcSubject = idToken.sub
    const oidcRoles = idToken[oidcConfig.value.roleClaim] || []
    
    // Поиск или создание пользователя
    let user = await usersApi.getByEmail(email)
    
    if (!user) {
      if (oidcConfig.value.autoCreateUsers) {
        // Автоматическое создание пользователя
        const roleId = oidcRoles.length > 0 
          ? mapOIDCRole(oidcRoles[0])
          : oidcConfig.value.defaultRoleId
        
        user = await usersApi.create({
          name,
          email,
          roleId,
          oidcSubject,
          lastLogin: new Date().toISOString()
        })
      } else {
        throw new Error('Пользователь не найден и автоматическое создание отключено')
      }
    } else {
      // Обновление информации о последнем входе
      await usersApi.update(user.id, {
        lastLogin: new Date().toISOString(),
        oidcSubject
      })
    }
    
    // Сохранение сессии
    currentUser.value = user
    isAuthenticated.value = true
    localStorage.setItem('current_user', JSON.stringify(user))
    
    return user
  } finally {
    isLoading.value = false
  }
}

// Начало OIDC авторизации
function startOIDCLogin() {
  if (!oidcConfig.value.enabled) {
    throw new Error('OIDC авторизация не настроена')
  }
  
  // В реальной реализации здесь будет редирект на OIDC провайдер
  // Для демонстрации симулируем callback
  const mockIdToken = {
    email: 'user@company.com',
    name: 'Test User',
    sub: 'oidc-user-123',
    role: ['editor']
  }
  
  return handleOIDCCallback(mockIdToken)
}

// Выход
function logout() {
  currentUser.value = null
  isAuthenticated.value = false
  localStorage.removeItem('current_user')
}

// Composables
export function useOIDC() {
  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated: computed(() => isAuthenticated.value),
    isLoading: computed(() => isLoading.value),
    oidcConfig: computed(() => oidcConfig.value),
    
    initOIDC,
    startOIDCLogin,
    handleOIDCCallback,
    logout,
    saveOIDCConfig,
    mapOIDCRole
  }
}
