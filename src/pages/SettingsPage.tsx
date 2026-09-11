import React, { useState } from 'react';
import {
  Save,
  Globe,
  Palette,
  Mail,
  Shield,
  Database,
  Server,
  RefreshCw,
  HardDrive,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: 'general', label: 'Общие', icon: Globe },
    { id: 'appearance', label: 'Внешний вид', icon: Palette },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'database', label: 'База данных', icon: Database },
    { id: 'system', label: 'Система', icon: Server },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Настройки</h1>
          <p className="text-sm text-slate-500 mt-1">Конфигурация системы управления контентом</p>
        </div>
        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Сохранено!' : 'Сохранить изменения'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 p-2 h-fit">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'general' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">Общие настройки</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Название сайта</label>
                  <input
                    type="text"
                    defaultValue="Enterprise CMS"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">URL сайта</label>
                  <input
                    type="text"
                    defaultValue="https://company.ru"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email администратора</label>
                  <input
                    type="email"
                    defaultValue="admin@company.ru"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Язык по умолчанию</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Русский</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Описание сайта</label>
                <textarea
                  defaultValue="Корпоративная система управления контентом"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="maintenance" className="w-4 h-4 text-blue-600 rounded" />
                <label htmlFor="maintenance" className="text-sm text-slate-700">Режим обслуживания</label>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">Внешний вид</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Основной цвет</label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#2563eb" className="w-10 h-10 rounded-lg border border-slate-200" />
                    <input type="text" defaultValue="#2563EB" className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Тема</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Светлая</option>
                    <option>Тёмная</option>
                    <option>Системная</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Шрифт</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Размер шрифта</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>14px</option>
                    <option>16px</option>
                    <option>18px</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">Настройки email</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">SMTP сервер</label>
                  <input type="text" defaultValue="smtp.company.ru" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Порт</label>
                  <input type="text" defaultValue="587" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Логин</label>
                  <input type="text" defaultValue="noreply@company.ru" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Пароль</label>
                  <input type="password" defaultValue="••••••••" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                Отправить тестовое письмо
              </button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">Безопасность</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Двухфакторная аутентификация</p>
                    <p className="text-xs text-slate-500 mt-0.5">Дополнительная защита аккаунта</p>
                  </div>
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200">
                    Включено
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">CAPTCHA при входе</p>
                    <p className="text-xs text-slate-500 mt-0.5">Защита от брутфорс-атак</p>
                  </div>
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200">
                    Включено
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Автоматический выход</p>
                    <p className="text-xs text-slate-500 mt-0.5">Через 30 минут неактивности</p>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200">
                    Настроить
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">База данных</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Тип БД</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>PostgreSQL 16</option>
                    <option>MS SQL Server 2022</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Хост</label>
                  <input type="text" defaultValue="localhost" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Порт</label>
                  <input type="text" defaultValue="5432" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Имя базы данных</label>
                  <input type="text" defaultValue="enterprise_cms" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Резервное копирование</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Последняя копия: сегодня, 03:00 (2.4 MB)</p>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                  <RefreshCw className="w-3.5 h-3.5" /> Создать копию сейчас
                </button>
              </div>
            </div>
          )}

          {activeSection === 'system' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">Системная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Backend Framework</p>
                  <p className="text-sm font-semibold text-slate-800">ASP.NET Core 8.0</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Frontend Framework</p>
                  <p className="text-sm font-semibold text-slate-800">Vue.js 3.4</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">База данных</p>
                  <p className="text-sm font-semibold text-slate-800">PostgreSQL 16.1</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Версия CMS</p>
                  <p className="text-sm font-semibold text-slate-800">2.1.0 (Build 2024.01)</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Сервер</p>
                  <p className="text-sm font-semibold text-slate-800">Kestrel / IIS</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Кэш</p>
                  <p className="text-sm font-semibold text-slate-800">Redis 7.2</p>
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-medium text-amber-800">Доступно обновление</p>
                <p className="text-xs text-amber-600 mt-1">Версия 2.2.0 доступна для установки. Рекомендуется обновиться для получения последних исправлений безопасности.</p>
                <button className="mt-3 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700">
                  Обновить сейчас
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
