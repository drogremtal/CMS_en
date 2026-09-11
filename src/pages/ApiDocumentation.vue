<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">API Документация</h1>
        <p class="text-sm text-slate-500 mt-1">Документация REST API контроллеров</p>
      </div>
      <button
        @click="exportDocs"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Экспорт OpenAPI
      </button>
    </div>

    <!-- API Info -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-slate-800 mb-2">Enterprise CMS API</h3>
          <p class="text-sm text-slate-600 mb-4">
            RESTful API для управления контентом, пользователями и настройками системы.
            Base URL: <code class="px-2 py-1 bg-white rounded text-xs font-mono">/api/v1</code>
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
              ASP.NET Core 8.0
            </span>
            <span class="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
              JWT Authentication
            </span>
            <span class="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
              Role-Based Access
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controllers List -->
    <div class="space-y-4">
      <div
        v-for="controller in controllers"
        :key="controller.name"
        class="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <!-- Controller Header -->
        <div
          class="px-6 py-4 bg-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
          @click="toggleController(controller.name)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-slate-400 transition-transform"
                :class="{ 'rotate-90': expandedControllers.includes(controller.name) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <div>
                <h3 class="text-base font-semibold text-slate-800">{{ controller.name }}</h3>
                <p class="text-xs text-slate-500 mt-0.5">{{ controller.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {{ controller.endpoints.length }} endpoints
              </span>
            </div>
          </div>
        </div>

        <!-- Endpoints -->
        <div v-if="expandedControllers.includes(controller.name)" class="divide-y divide-slate-100">
          <div
            v-for="endpoint in controller.endpoints"
            :key="endpoint.path"
            class="px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <div class="flex items-start gap-4">
              <span
                :class="[
                  'px-3 py-1 rounded text-xs font-bold uppercase min-w-[70px] text-center',
                  getMethodColor(endpoint.method)
                ]"
              >
                {{ endpoint.method }}
              </span>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <code class="text-sm font-mono text-slate-800">{{ endpoint.path }}</code>
                  <span v-if="endpoint.deprecated" class="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                    Deprecated
                  </span>
                </div>
                <p class="text-sm text-slate-600 mb-2">{{ endpoint.description }}</p>
                
                <!-- Parameters -->
                <div v-if="endpoint.parameters && endpoint.parameters.length > 0" class="mb-3">
                  <p class="text-xs font-medium text-slate-700 mb-1">Параметры:</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="param in endpoint.parameters"
                      :key="param.name"
                      class="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs"
                    >
                      <span class="font-medium">{{ param.name }}</span>
                      <span class="text-slate-500">({{ param.type }})</span>
                      <span v-if="param.required" class="text-red-500">*</span>
                    </span>
                  </div>
                </div>

                <!-- Response -->
                <div v-if="endpoint.response" class="mb-3">
                  <p class="text-xs font-medium text-slate-700 mb-1">Ответ:</p>
                  <div class="bg-slate-50 rounded p-2">
                    <code class="text-xs font-mono text-slate-600">{{ endpoint.response }}</code>
                  </div>
                </div>

                <!-- Permissions -->
                <div v-if="endpoint.permissions && endpoint.permissions.length > 0" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="perm in endpoint.permissions"
                      :key="perm"
                      class="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded border border-amber-200"
                    >
                      {{ perm }}
                    </span>
                  </div>
                </div>
              </div>
              <button
                @click.stop="testEndpoint(endpoint)"
                class="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Parameter {
  name: string
  type: string
  required: boolean
  description?: string
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  parameters?: Parameter[]
  response?: string
  permissions?: string[]
  deprecated?: boolean
}

interface Controller {
  name: string
  description: string
  endpoints: Endpoint[]
}

const expandedControllers = ref<string[]>(['PagesController'])

const controllers = ref<Controller[]>([
  {
    name: 'PagesController',
    description: 'Управление страницами сайта',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/pages',
        description: 'Получить список всех страниц',
        parameters: [
          { name: 'status', type: 'string', required: false, description: 'Фильтр по статусу' },
          { name: 'page', type: 'int', required: false, description: 'Номер страницы' },
          { name: 'pageSize', type: 'int', required: false, description: 'Размер страницы' }
        ],
        response: 'ActionResult<List<Page>>',
        permissions: ['pages.view']
      },
      {
        method: 'GET',
        path: '/api/v1/pages/{id}',
        description: 'Получить страницу по ID',
        parameters: [
          { name: 'id', type: 'string', required: true, description: 'ID страницы' }
        ],
        response: 'ActionResult<Page>',
        permissions: ['pages.view']
      },
      {
        method: 'POST',
        path: '/api/v1/pages',
        description: 'Создать новую страницу',
        parameters: [
          { name: 'title', type: 'string', required: true },
          { name: 'slug', type: 'string', required: true },
          { name: 'content', type: 'string', required: true },
          { name: 'status', type: 'string', required: false },
          { name: 'template', type: 'string', required: false }
        ],
        response: 'ActionResult<Page>',
        permissions: ['pages.create']
      },
      {
        method: 'PUT',
        path: '/api/v1/pages/{id}',
        description: 'Обновить страницу',
        parameters: [
          { name: 'id', type: 'string', required: true },
          { name: 'title', type: 'string', required: false },
          { name: 'content', type: 'string', required: false },
          { name: 'status', type: 'string', required: false }
        ],
        response: 'ActionResult<Page>',
        permissions: ['pages.edit']
      },
      {
        method: 'DELETE',
        path: '/api/v1/pages/{id}',
        description: 'Удалить страницу',
        parameters: [
          { name: 'id', type: 'string', required: true }
        ],
        response: 'ActionResult<bool>',
        permissions: ['pages.delete']
      }
    ]
  },
  {
    name: 'MediaController',
    description: 'Управление медиафайлами',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/media',
        description: 'Получить список медиафайлов',
        parameters: [
          { name: 'type', type: 'string', required: false, description: 'Тип файла' }
        ],
        response: 'ActionResult<List<MediaItem>>',
        permissions: ['media.view']
      },
      {
        method: 'POST',
        path: '/api/v1/media/upload',
        description: 'Загрузить медиафайл',
        parameters: [
          { name: 'file', type: 'IFormFile', required: true, description: 'Файл для загрузки' }
        ],
        response: 'ActionResult<MediaItem>',
        permissions: ['media.upload']
      },
      {
        method: 'DELETE',
        path: '/api/v1/media/{id}',
        description: 'Удалить медиафайл',
        parameters: [
          { name: 'id', type: 'string', required: true }
        ],
        response: 'ActionResult<bool>',
        permissions: ['media.delete']
      }
    ]
  },
  {
    name: 'UsersController',
    description: 'Управление пользователями',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/users',
        description: 'Получить список пользователей',
        response: 'ActionResult<List<User>>',
        permissions: ['users.view']
      },
      {
        method: 'POST',
        path: '/api/v1/users',
        description: 'Создать нового пользователя',
        parameters: [
          { name: 'name', type: 'string', required: true },
          { name: 'email', type: 'string', required: true },
          { name: 'roleId', type: 'string', required: true }
        ],
        response: 'ActionResult<User>',
        permissions: ['users.manage']
      },
      {
        method: 'PUT',
        path: '/api/v1/users/{id}',
        description: 'Обновить пользователя',
        parameters: [
          { name: 'id', type: 'string', required: true },
          { name: 'name', type: 'string', required: false },
          { name: 'roleId', type: 'string', required: false }
        ],
        response: 'ActionResult<User>',
        permissions: ['users.manage']
      }
    ]
  },
  {
    name: 'RolesController',
    description: 'Управление ролями и правами доступа',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/roles',
        description: 'Получить список ролей',
        response: 'ActionResult<List<Role>>',
        permissions: ['roles.view']
      },
      {
        method: 'POST',
        path: '/api/v1/roles',
        description: 'Создать новую роль',
        parameters: [
          { name: 'name', type: 'string', required: true },
          { name: 'description', type: 'string', required: false },
          { name: 'permissions', type: 'List<string>', required: true }
        ],
        response: 'ActionResult<Role>',
        permissions: ['roles.manage']
      }
    ]
  },
  {
    name: 'TestsController',
    description: 'Управление тестами',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/tests',
        description: 'Получить список тестов',
        response: 'ActionResult<List<Test>>',
        permissions: ['tests.view']
      },
      {
        method: 'POST',
        path: '/api/v1/tests',
        description: 'Создать новый тест',
        parameters: [
          { name: 'title', type: 'string', required: true },
          { name: 'questions', type: 'List<Question>', required: true }
        ],
        response: 'ActionResult<Test>',
        permissions: ['tests.create']
      }
    ]
  },
  {
    name: 'TicketsController',
    description: 'Управление тикетами HelpDesk',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/tickets',
        description: 'Получить список тикетов',
        parameters: [
          { name: 'status', type: 'string', required: false },
          { name: 'priority', type: 'string', required: false }
        ],
        response: 'ActionResult<List<Ticket>>',
        permissions: ['helpdesk.view']
      },
      {
        method: 'POST',
        path: '/api/v1/tickets',
        description: 'Создать новый тикет',
        parameters: [
          { name: 'title', type: 'string', required: true },
          { name: 'description', type: 'string', required: true },
          { name: 'priority', type: 'string', required: false },
          { name: 'category', type: 'string', required: false }
        ],
        response: 'ActionResult<Ticket>',
        permissions: ['helpdesk.view']
      },
      {
        method: 'PUT',
        path: '/api/v1/tickets/{id}/status',
        description: 'Изменить статус тикета',
        parameters: [
          { name: 'id', type: 'string', required: true },
          { name: 'status', type: 'string', required: true }
        ],
        response: 'ActionResult<Ticket>',
        permissions: ['helpdesk.manage']
      }
    ]
  },
  {
    name: 'AuthController',
    description: 'Аутентификация и авторизация',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        description: 'Вход в систему',
        parameters: [
          { name: 'email', type: 'string', required: true },
          { name: 'password', type: 'string', required: true }
        ],
        response: 'ActionResult<AuthToken>'
      },
      {
        method: 'POST',
        path: '/api/v1/auth/logout',
        description: 'Выход из системы',
        response: 'ActionResult<bool>'
      },
      {
        method: 'GET',
        path: '/api/v1/auth/me',
        description: 'Получить информацию о текущем пользователе',
        response: 'ActionResult<User>',
        permissions: ['authenticated']
      }
    ]
  }
])

function toggleController(name: string) {
  const index = expandedControllers.value.indexOf(name)
  if (index > -1) {
    expandedControllers.value.splice(index, 1)
  } else {
    expandedControllers.value.push(name)
  }
}

function getMethodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-100 text-emerald-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700',
    PATCH: 'bg-purple-100 text-purple-700'
  }
  return colors[method] || 'bg-slate-100 text-slate-700'
}

function testEndpoint(endpoint: Endpoint) {
  alert(`Тестирование endpoint: ${endpoint.method} ${endpoint.path}\n\nФункционал в разработке`)
}

function exportDocs() {
  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Enterprise CMS API',
      version: '1.0.0',
      description: 'REST API для Enterprise CMS'
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Production server'
      }
    ],
    paths: {}
  }

  controllers.value.forEach(controller => {
    controller.endpoints.forEach(endpoint => {
      const path = endpoint.path.replace('{id}', '{id}')
      if (!openApiSpec.paths[path]) {
        openApiSpec.paths[path] = {}
      }
      openApiSpec.paths[path][endpoint.method.toLowerCase()] = {
        summary: endpoint.description,
        parameters: endpoint.parameters?.map(p => ({
          name: p.name,
          in: 'path',
          required: p.required,
          schema: { type: p.type }
        })),
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: { type: 'object' }
              }
            }
          }
        }
      }
    })
  })

  const blob = new Blob([JSON.stringify(openApiSpec, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'openapi.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
