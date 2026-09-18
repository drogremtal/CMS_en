import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./pages/Dashboard.vue')
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('./pages/PagesList.vue')
  },
  {
    path: '/media',
    name: 'Media',
    component: () => import('./pages/MediaLibrary.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('./pages/UsersPage.vue')
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('./pages/RolesPage.vue')
  },
  {
    path: '/tests',
    name: 'Tests',
    component: () => import('./pages/TestsList.vue')
  },
  {
    path: '/helpdesk',
    name: 'HelpDesk',
    component: () => import('./pages/HelpDesk.vue')
  },
  {
    path: '/api-docs',
    name: 'ApiDocs',
    component: () => import('./pages/ApiDocumentation.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./pages/SettingsPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
