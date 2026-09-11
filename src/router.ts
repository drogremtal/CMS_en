import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import PagesList from './pages/PagesList.vue'
import PageEditor from './pages/PageEditor.vue'
import PagePreview from './pages/PagePreview.vue'
import MediaLibrary from './pages/MediaLibrary.vue'
import UsersPage from './pages/UsersPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import PublicLayout from './components/PublicLayout.vue'
import PublicHome from './pages/PublicHome.vue'
import PublicPage from './pages/PublicPage.vue'

import RolesPage from './pages/RolesPage.vue'
import TestsList from './pages/TestsList.vue'
import TestEditor from './pages/TestEditor.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/pages', name: 'PagesList', component: PagesList },
  { path: '/pages/new', name: 'PageNew', component: PageEditor },
  { path: '/pages/edit/:id', name: 'PageEdit', component: PageEditor },
  { path: '/pages/preview/:id', name: 'PagePreview', component: PagePreview },
  { path: '/media', name: 'Media', component: MediaLibrary },
  { path: '/users', name: 'Users', component: UsersPage },
  { path: '/roles', name: 'Roles', component: RolesPage },
  { path: '/tests', name: 'Tests', component: TestsList },
  { path: '/tests/new', name: 'TestNew', component: TestEditor },
  { path: '/tests/edit/:id', name: 'TestEdit', component: TestEditor },
  { path: '/settings', name: 'Settings', component: SettingsPage },
  {
    path: '/site',
    component: PublicLayout,
    children: [
      { path: '', name: 'PublicHome', component: PublicHome },
      { path: ':slug', name: 'PublicPage', component: PublicPage },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
