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

        <!-- OIDC -->
        <div v-if="activeSection === 'oidc'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">OIDC Авторизация</h3>
          
          <div class="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <p class="text-sm font-medium text-slate-800">Включить OIDC авторизацию</p>
              <p class="text-xs text-slate-600 mt-0.5">Single Sign-On через корпоративный провайдер</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="oidcEnabled" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div v-if="oidcEnabled" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Провайдер</label>
              <select v-model="oidcProvider" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Azure AD">Azure AD</option>
                <option value="Keycloak">Keycloak</option>
                <option value="Auth0">Auth0</option>
                <option value="Okta">Okta</option>
                <option value="Google">Google</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Authority URL</label>
              <input v-model="oidcAuthority" type="text" placeholder="https://login.microsoftonline.com/{tenant-id}" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Client ID</label>
              <input v-model="oidcClientId" type="text" placeholder="your-client-id" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Redirect URI</label>
              <input v-model="oidcRedirectUri" type="text" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div class="border-t border-slate-200 pt-4">
              <h4 class="text-sm font-semibold text-slate-800 mb-3">Маппинг ролей</h4>
              <p class="text-xs text-slate-500 mb-3">Сопоставьте роли из OIDC провайдера с ролями в CMS</p>
              
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <input type="text" value="admin" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="OIDC роль" />
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <select class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Администратор</option>
                    <option>Редактор</option>
                    <option>Наблюдатель</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <input type="text" value="editor" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="OIDC роль" />
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <select class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Администратор</option>
                    <option selected>Редактор</option>
                    <option>Наблюдатель</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <input type="text" value="viewer" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="OIDC роль" />
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <select class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Администратор</option>
                    <option>Редактор</option>
                    <option selected>Наблюдатель</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">Автоматическое создание пользователей</p>
                <p class="text-xs text-slate-500 mt-0.5">Создавать аккаунт при первом входе через OIDC</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="oidcAutoCreate" class="sr-only peer" checked />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Роль по умолчанию</label>
              <select v-model="oidcDefaultRole" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Администратор</option>
                <option value="editor">Редактор</option>
                <option value="viewer" selected>Наблюдатель</option>
              </select>
              <p class="text-xs text-slate-500 mt-1">Назначается, если роль не найдена в маппинге</p>
            </div>
          </div>

          <div v-if="oidcEnabled" class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p class="text-sm font-medium text-emerald-800">✓ OIDC настроен</p>
            <p class="text-xs text-emerald-600 mt-1">Пользователи смогут входить через {{ oidcProvider }}</p>
          </div>
        </div>

        <!-- HelpDesk -->
        <div v-if="activeSection === 'helpdesk'" class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 class="text-lg font-semibold text-slate-800">Модуль HelpDesk</h3>
          
          <div class="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <p class="text-sm font-medium text-slate-800">Включить модуль HelpDesk</p>
              <p class="text-xs text-slate-600 mt-0.5">Система управления заявками и обращениями</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="helpdeskSettings.enabled" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div v-if="helpdeskSettings.enabled" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Приоритет по умолчанию</label>
              <select v-model="helpdeskSettings.defaultPriority" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
                <option value="urgent">Срочный</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Категория по умолчанию</label>
              <select v-model="helpdeskSettings.defaultCategory" class="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="cat in helpdeskSettings.categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Категории тикетов</label>
              <div class="space-y-2">
                <div v-for="(cat, index) in helpdeskSettings.categories" :key="index" class="flex items-center gap-2">
                  <input
                    v-model="helpdeskSettings.categories[index]"
                    type="text"
                    class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    @click="removeCategory(index)"
                    class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button
                  @click="addCategory"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Добавить категорию
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">Автоматическое назначение</p>
                <p class="text-xs text-slate-500 mt-0.5">Автоматически назначать исполнителя для новых тикетов</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="helpdeskSettings.autoAssign" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">Email уведомления</p>
                <p class="text-xs text-slate-500 mt-0.5">Отправлять уведомления о новых тикетах по email</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="helpdeskSettings.emailNotifications" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-slate-700">SLA (Service Level Agreement)</p>
                <p class="text-xs text-slate-500 mt-0.5">Контроль времени реакции и решения тикетов</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="helpdeskSettings.slaEnabled" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div v-if="helpdeskSettings.slaEnabled" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Время реакции (часы)</label>
                <input
                  v-model.number="helpdeskSettings.slaResponseTime"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Время решения (часы)</label>
                <input
                  v-model.number="helpdeskSettings.slaResolutionTime"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div v-if="helpdeskSettings.enabled" class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p class="text-sm font-medium text-emerald-800">✓ Модуль HelpDesk включен</p>
            <p class="text-xs text-emerald-600 mt-1">Пункт меню HelpDesk доступен в боковой панели</p>
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
import { ref, onMounted } from 'vue'
import { helpdeskSettingsApi } from '../services/api'
import type { HelpDeskSettings } from '../types'

const activeSection = ref('general')
const saved = ref(false)

const helpdeskSettings = ref<HelpDeskSettings>({
  enabled: false,
  defaultPriority: 'medium',
  defaultCategory: 'Общий вопрос',
  categories: ['Техническая проблема', 'Баг', 'Запрос на изменение', 'Общий вопрос', 'Предложение'],
  autoAssign: false,
  emailNotifications: true,
  slaEnabled: false,
  slaResponseTime: 24,
  slaResolutionTime: 72,
})

onMounted(async () => {
  helpdeskSettings.value = await helpdeskSettingsApi.get()
})

function addCategory() {
  helpdeskSettings.value.categories.push('')
}

function removeCategory(index: number) {
  helpdeskSettings.value.categories.splice(index, 1)
}

// OIDC settings
const oidcEnabled = ref(false)
const oidcProvider = ref('Azure AD')
const oidcAuthority = ref('https://login.microsoftonline.com/{tenant-id}')
const oidcClientId = ref('')
const oidcRedirectUri = ref(window.location.origin + '/auth/callback')
const oidcAutoCreate = ref(true)
const oidcDefaultRole = ref('viewer')

const sections = [
  { id: 'general', label: 'Общие' },
  { id: 'appearance', label: 'Внешний вид' },
  { id: 'email', label: 'Email' },
  { id: 'security', label: 'Безопасность' },
  { id: 'oidc', label: 'OIDC Авторизация' },
  { id: 'helpdesk', label: 'HelpDesk' },
  { id: 'database', label: 'База данных' },
  { id: 'system', label: 'Система' },
]

async function handleSave() {
  if (activeSection.value === 'helpdesk') {
    await helpdeskSettingsApi.update(helpdeskSettings.value)
  }
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>
