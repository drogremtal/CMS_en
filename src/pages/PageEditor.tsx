import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save,
  Eye,
  ArrowLeft,
  FileText,
  Settings,
  Image,
  Globe,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link2,
  Quote,
  Code,
} from 'lucide-react';
import { pagesApi } from '../services/api';
import { Page } from '../types';

export const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [page, setPage] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    status: 'draft',
    author: 'Администратор',
    metaDescription: '',
    metaKeywords: '',
    template: 'default',
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

  useEffect(() => {
    if (!isNew && id) {
      pagesApi.getById(id).then((data) => {
        if (data) {
          setPage(data);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/gi, (char) => {
        const map: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        };
        return map[char.toLowerCase()] || char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setPage((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSave = async (status?: 'published' | 'draft') => {
    setSaving(true);
    const pageData = {
      ...page,
      status: status || page.status || 'draft',
    };

    if (isNew) {
      const created = await pagesApi.create(pageData as Omit<Page, 'id' | 'createdAt' | 'updatedAt'>);
      setSaving(false);
      navigate(`/pages/edit/${created.id}`);
    } else {
      await pagesApi.update(id!, pageData);
      setSaving(false);
    }
  };

  const insertTag = (tag: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = page.content?.substring(start, end) || '';
    let insertion = '';

    switch (tag) {
      case 'h1': insertion = `<h1>${selectedText || 'Заголовок'}</h1>`; break;
      case 'h2': insertion = `<h2>${selectedText || 'Подзаголовок'}</h2>`; break;
      case 'bold': insertion = `<strong>${selectedText || 'текст'}</strong>`; break;
      case 'italic': insertion = `<em>${selectedText || 'текст'}</em>`; break;
      case 'list': insertion = `<ul>\n<li>${selectedText || 'элемент'}</li>\n</ul>`; break;
      case 'ordered-list': insertion = `<ol>\n<li>${selectedText || 'элемент'}</li>\n</ol>`; break;
      case 'link': insertion = `<a href="#">${selectedText || 'ссылка'}</a>`; break;
      case 'quote': insertion = `<blockquote>${selectedText || 'цитата'}</blockquote>`; break;
      case 'code': insertion = `<code>${selectedText || 'код'}</code>`; break;
    }

    const newContent = (page.content || '').substring(0, start) + insertion + (page.content || '').substring(end);
    setPage((prev) => ({ ...prev, content: newContent }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/pages')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {isNew ? 'Новая страница' : 'Редактирование'}
            </h1>
            <p className="text-sm text-slate-500">
              {isNew ? 'Создание новой страницы' : page.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Сохранение...' : 'Сохранить черновик'}
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <Globe className="w-4 h-4" />
            Опубликовать
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <input
              type="text"
              placeholder="Заголовок страницы"
              value={page.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 placeholder-slate-300 focus:outline-none border-none"
            />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">URL:</span>
              <input
                type="text"
                placeholder="slug-stranitsy"
                value={page.slug || ''}
                onChange={(e) => setPage((prev) => ({ ...prev, slug: e.target.value }))}
                className="text-sm text-slate-600 bg-transparent focus:outline-none flex-1"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl border border-slate-200">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-3 border-b border-slate-200 overflow-x-auto">
              <button onClick={() => insertTag('h1')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Заголовок 1">
                <Heading1 className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => insertTag('h2')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Заголовок 2">
                <Heading2 className="w-4 h-4 text-slate-600" />
              </button>
              <div className="w-px h-5 bg-slate-200 mx-1"></div>
              <button onClick={() => insertTag('bold')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Жирный">
                <Bold className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => insertTag('italic')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Курсив">
                <Italic className="w-4 h-4 text-slate-600" />
              </button>
              <div className="w-px h-5 bg-slate-200 mx-1"></div>
              <button onClick={() => insertTag('list')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Маркированный список">
                <List className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => insertTag('ordered-list')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Нумерованный список">
                <ListOrdered className="w-4 h-4 text-slate-600" />
              </button>
              <div className="w-px h-5 bg-slate-200 mx-1"></div>
              <button onClick={() => insertTag('link')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Ссылка">
                <Link2 className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => insertTag('quote')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Цитата">
                <Quote className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => insertTag('code')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Код">
                <Code className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Editor Area */}
            <textarea
              id="content-editor"
              placeholder="Начните вводить содержимое страницы..."
              value={page.content || ''}
              onChange={(e) => setPage((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full min-h-[400px] p-5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none resize-y font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 mx-auto mb-1" />
                Контент
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === 'seo'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Globe className="w-4 h-4 mx-auto mb-1" />
                SEO
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" />
                Настройки
              </button>
            </div>

            <div className="p-4 space-y-4">
              {activeTab === 'content' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Шаблон</label>
                    <select
                      value={page.template || 'default'}
                      onChange={(e) => setPage((prev) => ({ ...prev, template: e.target.value as Page['template'] }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="default">Стандартная</option>
                      <option value="landing">Лендинг</option>
                      <option value="blog">Блог</option>
                      <option value="contact">Контакты</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Статус</label>
                    <select
                      value={page.status || 'draft'}
                      onChange={(e) => setPage((prev) => ({ ...prev, status: e.target.value as Page['status'] }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Черновик</option>
                      <option value="published">Опубликовано</option>
                      <option value="archived">В архиве</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Порядок сортировки</label>
                    <input
                      type="number"
                      value={page.sortOrder || 0}
                      onChange={(e) => setPage((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'seo' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Meta Description</label>
                    <textarea
                      value={page.metaDescription || ''}
                      onChange={(e) => setPage((prev) => ({ ...prev, metaDescription: e.target.value }))}
                      placeholder="Описание страницы для поисковых систем"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {(page.metaDescription || '').length}/160 символов
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Meta Keywords</label>
                    <input
                      type="text"
                      value={page.metaKeywords || ''}
                      onChange={(e) => setPage((prev) => ({ ...prev, metaKeywords: e.target.value }))}
                      placeholder="ключевые, слова, через, запятую"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* SEO Preview */}
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Предпросмотр в Google:</p>
                    <p className="text-sm text-blue-700 truncate">{page.title || 'Заголовок страницы'}</p>
                    <p className="text-xs text-emerald-700 truncate">company.ru/{page.slug || 'slug'}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {page.metaDescription || 'Описание страницы будет отображаться здесь...'}
                    </p>
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Автор</label>
                    <input
                      type="text"
                      value={page.author || ''}
                      onChange={(e) => setPage((prev) => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Изображение</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                      <Image className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">Перетащите изображение</p>
                      <button className="text-xs text-blue-600 font-medium mt-1 hover:text-blue-700">
                        или выберите файл
                      </button>
                    </div>
                  </div>
                  {!isNew && (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-400">
                        Создано: {new Date(page.createdAt || '').toLocaleString('ru-RU')}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Обновлено: {new Date(page.updatedAt || '').toLocaleString('ru-RU')}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
