import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import PagesList from './pages/PagesList.vue'
import PageEditor from './pages/PageEditor.vue'
import PagePreview from './pages/PagePreview.vue'
import MediaLibrary from './pages/MediaLibrary.vue'
import UsersPage from './pages/UsersPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/pages', name: 'PagesList', component: PagesList },
  { path: '/pages/new', name: 'PageNew', component: PageEditor },
  { path: '/pages/edit/:id', name: 'PageEdit', component: PageEditor },
  { path: '/pages/preview/:id', name: 'PagePreview', component: PagePreview },
  { path: '/media', name: 'Media', component: MediaLibrary },
  { path: '/users', name: 'Users', component: UsersPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
