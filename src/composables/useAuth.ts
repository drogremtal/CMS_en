import { ref, computed } from 'vue'
import { rolesApi, userApi } from '../services/api'
import type { Role, User } from '../types'

const currentUser = ref<User | null>(null)
const roles = ref<Role[]>([])
const initialized = ref(false)

// Синхронная инициализация из localStorage
function initSync() {
  if (initialized.value) return
  
  const userData = localStorage.getItem('cms_user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  } else {
    currentUser.value = { id: '1', name: 'Admin', email: 'admin@test.com', roleId: 'admin' }
  }
  
  const rolesData = localStorage.getItem('cms_roles')
  if (rolesData) {
    roles.value = JSON.parse(rolesData)
  }
  
  initialized.value = true
}

// Вызываем сразу при импорте
initSync()

export function useAuth() {
  const init = async () => {
    if (initialized.value) return
    initSync()
    // Дополнительная асинхронная загрузка для свежих данных
    currentUser.value = await userApi.getCurrent()
    roles.value = await rolesApi.getAll()
  }

  const currentRole = computed<Role | null>(() => {
    if (!currentUser.value) return null
    return roles.value.find(r => r.id === currentUser.value?.roleId) || null
  })

  const permissions = computed<string[]>(() => {
    return currentRole.value?.permissions || []
  })

  const hasPermission = (permission: string): boolean => {
    return permissions.value.includes(permission)
  }

  const hasAnyPermission = (perms: string[]): boolean => {
    return perms.some(p => permissions.value.includes(p))
  }

  const hasAllPermissions = (perms: string[]): boolean => {
    return perms.every(p => permissions.value.includes(p))
  }

  const canAccessPage = (requiredPermissions: string[]): boolean => {
    if (requiredPermissions.length === 0) return true
    return hasAnyPermission(requiredPermissions)
  }

  const switchRole = (roleId: string) => {
    if (currentUser.value) {
      currentUser.value.roleId = roleId
      // Сохраняем в localStorage
      const userData = localStorage.getItem('cms_user')
      if (userData) {
        const user = JSON.parse(userData)
        user.roleId = roleId
        localStorage.setItem('cms_user', JSON.stringify(user))
      }
    }
  }

  return {
    currentUser,
    currentRole,
    roles,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessPage,
    init,
    switchRole,
  }
}

// Page permission mapping
export const pagePermissions: Record<string, string[]> = {
  '/': ['pages.view'],
  '/pages': ['pages.view'],
  '/pages/new': ['pages.create'],
  '/media': ['media.view'],
  '/users': ['users.view'],
  '/roles': ['roles.view'],
  '/tests': ['tests.view'],
  '/tests/new': ['tests.create'],
  '/helpdesk': ['helpdesk.view'],
  '/settings': ['settings.view'],
}
