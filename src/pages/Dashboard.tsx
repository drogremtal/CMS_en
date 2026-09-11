import React, { useEffect, useState } from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  Image,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import { dashboardApi } from '../services/api';
import { DashboardStats } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Всего страниц',
      value: stats?.totalPages || 0,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      up: true,
    },
    {
      title: 'Опубликовано',
      value: stats?.publishedPages || 0,
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      change: '+8%',
      up: true,
    },
    {
      title: 'Черновики',
      value: stats?.draftPages || 0,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      change: '-3%',
      up: false,
    },
    {
      title: 'Медиафайлы',
      value: stats?.totalMedia || 0,
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      change: '+24%',
      up: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {card.up ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${card.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {card.change}
              </span>
              <span className="text-xs text-slate-400 ml-1">за месяц</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-800">Последняя активность</h3>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Все действия
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {stats?.recentActivity.map((activity) => (
              <div key={activity.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.action === 'created' ? 'bg-emerald-100' :
                  activity.action === 'updated' ? 'bg-blue-100' :
                  activity.action === 'deleted' ? 'bg-red-100' :
                  'bg-amber-100'
                }`}>
                  {activity.action === 'created' && <FileText className="w-4 h-4 text-emerald-600" />}
                  {activity.action === 'updated' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                  {activity.action === 'deleted' && <FileText className="w-4 h-4 text-red-600" />}
                  {activity.action === 'published' && <CheckCircle className="w-4 h-4 text-amber-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-slate-500">
                      {activity.action === 'created' ? 'создал(а)' :
                       activity.action === 'updated' ? 'обновил(а)' :
                       activity.action === 'deleted' ? 'удалил(а)' : 'опубликовал(а)'}
                    </span>{' '}
                    <span className="font-medium text-slate-800">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true, locale: ru })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Быстрые действия</h3>
          </div>
          <div className="p-5 space-y-3">
            <a
              href="/pages/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FileText className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Новая страница</p>
                <p className="text-xs text-slate-400">Создать контент</p>
              </div>
            </a>
            <a
              href="/media"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Image className="w-4.5 h-4.5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Загрузить медиа</p>
                <p className="text-xs text-slate-400">Изображения, документы</p>
              </div>
            </a>
            <a
              href="/settings"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Настройки сайта</p>
                <p className="text-xs text-slate-400">Конфигурация CMS</p>
              </div>
            </a>
          </div>

          {/* System Status */}
          <div className="p-5 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Статус системы
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Server</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-600 font-medium">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-600 font-medium">Connected</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Cache</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-600 font-medium">Active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
