import { ref, computed } from 'vue'
import { rolesApi, userApi } from '../services/api'
import type { Role, User } from '../types'

const currentUser = ref<User | null>(null)
const roles = ref<Role[]>([])
const initialized = ref(false)

export function useAuth() {
  const init = async () => {
    if (initialized.value) return
    currentUser.value = await userApi.getCurrent()
    roles.value = await rolesApi.getAll()
    initialized.value = true
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
  '/settings': ['settings.view'],
}
