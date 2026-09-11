import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, ExternalLink } from 'lucide-react';
import { pagesApi } from '../services/api';
import { Page } from '../types';

export const PagePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      pagesApi.getById(id).then((data) => {
        setPage(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Страница не найдена</p>
        <Link to="/pages" className="text-blue-600 text-sm mt-2 inline-block">Вернуться к списку</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/pages" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Предпросмотр</h1>
            <p className="text-sm text-slate-500">{page.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/pages/edit/${page.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Редактировать
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Открыть на сайте
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-500 border border-slate-200">
            https://company.ru/{page.slug}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                page.status === 'published' ? 'bg-emerald-50 text-emerald-700' :
                page.status === 'draft' ? 'bg-amber-50 text-amber-700' :
                'bg-slate-50 text-slate-600'
              }`}>
                {page.status === 'published' ? 'Опубликовано' :
                 page.status === 'draft' ? 'Черновик' : 'В архиве'}
              </span>
              <span className="text-xs text-slate-400">
                Шаблон: {page.template}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{page.title}</h1>
            <p className="text-sm text-slate-400 mt-2">
              Обновлено: {new Date(page.updatedAt).toLocaleString('ru-RU')} • Автор: {page.author}
            </p>
          </div>
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
};
