import React, { useEffect, useState } from 'react';
import {
  Upload,
  Image,
  FileText,
  Video,
  Trash2,
  Grid,
  List,
  Search,
  Download,
} from 'lucide-react';
import { mediaApi } from '../services/api';
import { MediaItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    const data = await mediaApi.getAll();
    setMedia(data);
    setLoading(false);
  };

  const handleUpload = async () => {
    // Simulate file upload
    const fakeFiles = [
      { name: `photo-${Date.now()}.jpg`, type: 'image/jpeg', size: Math.floor(Math.random() * 5000000) },
    ];
    for (const file of fakeFiles) {
      await mediaApi.upload(file);
    }
    loadMedia();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить этот файл?')) {
      await mediaApi.delete(id);
      loadMedia();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-8 h-8 text-blue-500" />;
      case 'video': return <Video className="w-8 h-8 text-purple-500" />;
      default: return <FileText className="w-8 h-8 text-amber-500" />;
    }
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Медиа-библиотека</h1>
          <p className="text-sm text-slate-500 mt-1">
            Управление файлами и изображениями • {media.length} файлов
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          Загрузить файл
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск файлов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все типы</option>
              <option value="image">Изображения</option>
              <option value="document">Документы</option>
              <option value="video">Видео</option>
            </select>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
        onClick={handleUpload}
      >
        <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-600">Перетащите файлы сюда или нажмите для загрузки</p>
        <p className="text-xs text-slate-400 mt-1">Поддерживаются: JPG, PNG, GIF, PDF, DOC, MP4 (макс. 50MB)</p>
      </div>

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-slate-50 flex items-center justify-center relative">
                {getIcon(item.type)}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors">
                    <Download className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-700 truncate">{item.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatFileSize(item.size)} • {formatDistanceToNow(new Date(item.uploadedAt), { locale: ru })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Файл</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Тип</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Размер</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Дата</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMedia.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center">
                        {item.type === 'image' && <Image className="w-4 h-4 text-blue-500" />}
                        {item.type === 'video' && <Video className="w-4 h-4 text-purple-500" />}
                        {item.type === 'document' && <FileText className="w-4 h-4 text-amber-500" />}
                      </div>
                      <span className="text-sm text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500 capitalize">{item.type}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{formatFileSize(item.size)}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">
                    {formatDistanceToNow(new Date(item.uploadedAt), { addSuffix: true, locale: ru })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Файлы не найдены</p>
        </div>
      )}
    </div>
  );
};
