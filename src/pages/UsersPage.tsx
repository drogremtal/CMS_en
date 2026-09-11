import React from 'react';
import {
  Users as UsersIcon,
  Shield,
  Edit3,
  Trash2,
  Plus,
  Mail,
  MoreVertical,
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

const demoUsers: UserData[] = [
  { id: '1', name: 'Иванов Алексей', email: 'ivanov@company.ru', role: 'admin', lastActive: '2 мин назад', status: 'active' },
  { id: '2', name: 'Петрова Мария', email: 'petrova@company.ru', role: 'editor', lastActive: '1 час назад', status: 'active' },
  { id: '3', name: 'Сидоров Дмитрий', email: 'sidorov@company.ru', role: 'editor', lastActive: '3 часа назад', status: 'active' },
  { id: '4', name: 'Козлова Анна', email: 'kozlova@company.ru', role: 'viewer', lastActive: '1 день назад', status: 'active' },
  { id: '5', name: 'Морозов Игорь', email: 'morozov@company.ru', role: 'viewer', lastActive: '5 дней назад', status: 'inactive' },
];

export const UsersPage: React.FC = () => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return { label: 'Администратор', color: 'bg-red-50 text-red-700 border-red-200' };
      case 'editor': return { label: 'Редактор', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'viewer': return { label: 'Наблюдатель', color: 'bg-slate-50 text-slate-600 border-slate-200' };
      default: return { label: role, color: 'bg-slate-50 text-slate-600 border-slate-200' };
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-500" />;
      case 'editor': return <Edit3 className="w-4 h-4 text-blue-500" />;
      default: return <UsersIcon className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Пользователи</h1>
          <p className="text-sm text-slate-500 mt-1">
            Управление доступом и ролями • {demoUsers.length} пользователей
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Добавить пользователя
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">1</p>
              <p className="text-sm text-slate-500">Администраторов</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">2</p>
              <p className="text-sm text-slate-500">Редакторов</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">2</p>
              <p className="text-sm text-slate-500">Наблюдателей</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Статус
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                Последняя активность
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {demoUsers.map((user) => {
              const role = getRoleLabel(user.role);
              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-medium text-slate-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${role.color}`}>
                      {getRoleIcon(user.role)}
                      {role.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      user.status === 'active' ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}></span>
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-500">{user.lastActive}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Roles Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Описание ролей</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-red-100 bg-red-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="font-medium text-slate-800">Администратор</span>
            </div>
            <p className="text-xs text-slate-600">
              Полный доступ ко всем функциям CMS, включая управление пользователями и настройками системы.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-slate-800">Редактор</span>
            </div>
            <p className="text-xs text-slate-600">
              Может создавать, редактировать и публиковать страницы. Управление медиа-библиотекой.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <UsersIcon className="w-5 h-5 text-slate-500" />
              <span className="font-medium text-slate-800">Наблюдатель</span>
            </div>
            <p className="text-xs text-slate-600">
              Доступ только для просмотра контента. Не может вносить изменения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
