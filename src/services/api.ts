import { Page, MediaItem, User, DashboardStats, Activity, Role, Test } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  pages: 'cms_pages',
  media: 'cms_media',
  user: 'cms_user',
  activities: 'cms_activities',
  roles: 'cms_roles',
  tests: 'cms_tests',
};

// Initialize with demo data
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.pages)) {
    const demoPages: Page[] = [
      {
        id: uuidv4(),
        title: 'Главная страница',
        slug: 'home',
        content: '<h1>Добро пожаловать</h1><p>Это главная страница нашего корпоративного сайта.</p><p>Мы предоставляем комплексные решения для бизнеса любого масштаба.</p>',
        status: 'published',
        author: 'Администратор',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'Корпоративный сайт - главная страница',
        metaKeywords: 'корпоративный, сайт, бизнес',
        template: 'landing',
        sortOrder: 1,
      },
      {
        id: uuidv4(),
        title: 'О компании',
        slug: 'about',
        content: '<h1>О нашей компании</h1><p>Мы — ведущий поставщик IT-решений с 2010 года.</p><p>Наша команда насчитывает более 500 специалистов.</p>',
        status: 'published',
        author: 'Администратор',
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'О компании - узнайте больше о нас',
        metaKeywords: 'о компании, о нас',
        template: 'default',
        sortOrder: 2,
      },
      {
        id: uuidv4(),
        title: 'Услуги',
        slug: 'services',
        content: '<h1>Наши услуги</h1><ul><li>Разработка программного обеспечения</li><li>Облачные решения</li><li>Кибербезопасность</li><li>Консалтинг</li></ul>',
        status: 'published',
        author: 'Редактор',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'Услуги компании',
        metaKeywords: 'услуги, разработка, облако',
        template: 'default',
        sortOrder: 3,
      },
      {
        id: uuidv4(),
        title: 'Контакты',
        slug: 'contacts',
        content: '<h1>Свяжитесь с нами</h1><p>Адрес: г. Москва, ул. Примерная, д. 1</p><p>Телефон: +7 (495) 123-45-67</p><p>Email: info@company.ru</p>',
        status: 'published',
        author: 'Администратор',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'Контактная информация',
        metaKeywords: 'контакты, адрес, телефон',
        template: 'contact',
        sortOrder: 4,
      },
      {
        id: uuidv4(),
        title: 'Блог - Новости компании',
        slug: 'blog-news',
        content: '<h1>Новости компании</h1><p>Следите за последними обновлениями и новостями.</p>',
        status: 'draft',
        author: 'Редактор',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'Блог и новости компании',
        metaKeywords: 'блог, новости',
        template: 'blog',
        sortOrder: 5,
      },
      {
        id: uuidv4(),
        title: 'Политика конфиденциальности',
        slug: 'privacy-policy',
        content: '<h1>Политика конфиденциальности</h1><p>Данный документ описывает политику обработки персональных данных.</p>',
        status: 'archived',
        author: 'Администратор',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        metaDescription: 'Политика конфиденциальности',
        metaKeywords: 'конфиденциальность, данные',
        template: 'default',
        sortOrder: 6,
      },
    ];
    localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(demoPages));
  }

  if (!localStorage.getItem(STORAGE_KEYS.media)) {
    const demoMedia: MediaItem[] = [
      { id: uuidv4(), name: 'hero-banner.jpg', url: '', type: 'image', size: 245000, uploadedAt: new Date().toISOString(), alt: 'Главный баннер' },
      { id: uuidv4(), name: 'company-logo.png', url: '', type: 'image', size: 45000, uploadedAt: new Date().toISOString(), alt: 'Логотип компании' },
      { id: uuidv4(), name: 'presentation.pdf', url: '', type: 'document', size: 1500000, uploadedAt: new Date().toISOString(), alt: '' },
      { id: uuidv4(), name: 'team-photo.jpg', url: '', type: 'image', size: 890000, uploadedAt: new Date().toISOString(), alt: 'Фото команды' },
    ];
    localStorage.setItem(STORAGE_KEYS.media, JSON.stringify(demoMedia));
  }

  if (!localStorage.getItem(STORAGE_KEYS.roles)) {
    const demoRoles: Role[] = [
      {
        id: 'admin',
        name: 'Администратор',
        description: 'Полный доступ ко всем функциям системы',
        permissions: ['pages.view', 'pages.create', 'pages.edit', 'pages.delete', 'pages.publish', 'media.view', 'media.upload', 'media.delete', 'users.view', 'users.manage', 'roles.view', 'roles.manage', 'tests.view', 'tests.create', 'tests.edit', 'tests.delete', 'settings.view', 'settings.edit'],
        color: '#ef4444',
        createdAt: new Date().toISOString(),
        isSystem: true,
      },
      {
        id: 'editor',
        name: 'Редактор',
        description: 'Может создавать и редактировать контент',
        permissions: ['pages.view', 'pages.create', 'pages.edit', 'pages.publish', 'media.view', 'media.upload', 'tests.view', 'tests.create', 'tests.edit'],
        color: '#3b82f6',
        createdAt: new Date().toISOString(),
        isSystem: true,
      },
      {
        id: 'viewer',
        name: 'Наблюдатель',
        description: 'Только просмотр контента',
        permissions: ['pages.view', 'media.view', 'tests.view'],
        color: '#64748b',
        createdAt: new Date().toISOString(),
        isSystem: true,
      },
    ];
    localStorage.setItem(STORAGE_KEYS.roles, JSON.stringify(demoRoles));
  }

  if (!localStorage.getItem(STORAGE_KEYS.user)) {
    const demoUser: User = {
      id: uuidv4(),
      name: 'Администратор',
      email: 'admin@company.ru',
      roleId: 'admin',
    };
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(demoUser));
  }

  if (!localStorage.getItem(STORAGE_KEYS.tests)) {
    const demoTests: Test[] = [];
    localStorage.setItem(STORAGE_KEYS.tests, JSON.stringify(demoTests));
  }

  if (!localStorage.getItem(STORAGE_KEYS.activities)) {
    const demoActivities: Activity[] = [
      { id: uuidv4(), action: 'created', target: 'Главная страница', user: 'Администратор', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: uuidv4(), action: 'updated', target: 'Услуги', user: 'Редактор', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: uuidv4(), action: 'published', target: 'О компании', user: 'Администратор', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      { id: uuidv4(), action: 'created', target: 'Блог - Новости', user: 'Редактор', timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
    ];
    localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(demoActivities));
  }
};

initializeData();

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Pages API
export const pagesApi = {
  getAll: async (): Promise<Page[]> => {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.pages);
    return data ? JSON.parse(data) : [];
  },

  getById: async (id: string): Promise<Page | null> => {
    await delay();
    const pages = await pagesApi.getAll();
    return pages.find(p => p.id === id) || null;
  },

  create: async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> => {
    await delay();
    const pages = await pagesApi.getAll();
    const newPage: Page = {
      ...page,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    pages.push(newPage);
    localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(pages));
    await activitiesApi.add({ action: 'created', target: newPage.title, user: 'Администратор' });
    return newPage;
  },

  update: async (id: string, updates: Partial<Page>): Promise<Page | null> => {
    await delay();
    const pages = await pagesApi.getAll();
    const index = pages.findIndex(p => p.id === id);
    if (index === -1) return null;
    pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(pages));
    await activitiesApi.add({ action: 'updated', target: pages[index].title, user: 'Администратор' });
    return pages[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const pages = await pagesApi.getAll();
    const page = pages.find(p => p.id === id);
    const filtered = pages.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(filtered));
    if (page) {
      await activitiesApi.add({ action: 'deleted', target: page.title, user: 'Администратор' });
    }
    return true;
  },
};

// Media API
export const mediaApi = {
  getAll: async (): Promise<MediaItem[]> => {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.media);
    return data ? JSON.parse(data) : [];
  },

  upload: async (file: { name: string; type: string; size: number }): Promise<MediaItem> => {
    await delay(500);
    const media = await mediaApi.getAll();
    const newItem: MediaItem = {
      id: uuidv4(),
      name: file.name,
      url: '',
      type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'document',
      size: file.size,
      uploadedAt: new Date().toISOString(),
      alt: '',
    };
    media.push(newItem);
    localStorage.setItem(STORAGE_KEYS.media, JSON.stringify(media));
    return newItem;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const media = await mediaApi.getAll();
    const filtered = media.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.media, JSON.stringify(filtered));
    return true;
  },
};

// Activities API
export const activitiesApi = {
  getAll: async (): Promise<Activity[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.activities);
    return data ? JSON.parse(data) : [];
  },

  add: async (activity: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> => {
    const activities = await activitiesApi.getAll();
    const newActivity: Activity = {
      ...activity,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    };
    activities.unshift(newActivity);
    if (activities.length > 50) activities.pop();
    localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities));
    return newActivity;
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    await delay();
    const pages = await pagesApi.getAll();
    const media = await mediaApi.getAll();
    const activities = await activitiesApi.getAll();

    return {
      totalPages: pages.length,
      publishedPages: pages.filter(p => p.status === 'published').length,
      draftPages: pages.filter(p => p.status === 'draft').length,
      totalMedia: media.length,
      recentActivity: activities.slice(0, 10),
    };
  },
};

// User API
export const userApi = {
  getCurrent: async (): Promise<User> => {
    await delay(100);
    const data = localStorage.getItem(STORAGE_KEYS.user);
    return data ? JSON.parse(data) : { id: '1', name: 'Admin', email: 'admin@test.com', roleId: 'admin' };
  },
};

// Roles API
export const rolesApi = {
  getAll: async (): Promise<Role[]> => {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.roles);
    return data ? JSON.parse(data) : [];
  },

  getById: async (id: string): Promise<Role | null> => {
    await delay();
    const roles = await rolesApi.getAll();
    return roles.find(r => r.id === id) || null;
  },

  create: async (role: Omit<Role, 'id' | 'createdAt'>): Promise<Role> => {
    await delay();
    const roles = await rolesApi.getAll();
    const newRole: Role = {
      ...role,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    roles.push(newRole);
    localStorage.setItem(STORAGE_KEYS.roles, JSON.stringify(roles));
    await activitiesApi.add({ action: 'created', target: `Роль: ${newRole.name}`, user: 'Администратор' });
    return newRole;
  },

  update: async (id: string, updates: Partial<Role>): Promise<Role | null> => {
    await delay();
    const roles = await rolesApi.getAll();
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) return null;
    roles[index] = { ...roles[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.roles, JSON.stringify(roles));
    await activitiesApi.add({ action: 'updated', target: `Роль: ${roles[index].name}`, user: 'Администратор' });
    return roles[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const roles = await rolesApi.getAll();
    const role = roles.find(r => r.id === id);
    if (role?.isSystem) return false; // Нельзя удалять системные роли
    const filtered = roles.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.roles, JSON.stringify(filtered));
    if (role) {
      await activitiesApi.add({ action: 'deleted', target: `Роль: ${role.name}`, user: 'Администратор' });
    }
    return true;
  },
};

// Tests API
export const testsApi = {
  getAll: async (): Promise<Test[]> => {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.tests);
    return data ? JSON.parse(data) : [];
  },

  getById: async (id: string): Promise<Test | null> => {
    await delay();
    const tests = await testsApi.getAll();
    return tests.find(t => t.id === id) || null;
  },

  create: async (test: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>): Promise<Test> => {
    await delay();
    const tests = await testsApi.getAll();
    const newTest: Test = {
      ...test,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tests.push(newTest);
    localStorage.setItem(STORAGE_KEYS.tests, JSON.stringify(tests));
    await activitiesApi.add({ action: 'created', target: `Тест: ${newTest.title}`, user: 'Администратор' });
    return newTest;
  },

  update: async (id: string, updates: Partial<Test>): Promise<Test | null> => {
    await delay();
    const tests = await testsApi.getAll();
    const index = tests.findIndex(t => t.id === id);
    if (index === -1) return null;
    tests[index] = { ...tests[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.tests, JSON.stringify(tests));
    await activitiesApi.add({ action: 'updated', target: `Тест: ${tests[index].title}`, user: 'Администратор' });
    return tests[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const tests = await testsApi.getAll();
    const test = tests.find(t => t.id === id);
    const filtered = tests.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.tests, JSON.stringify(filtered));
    if (test) {
      await activitiesApi.add({ action: 'deleted', target: `Тест: ${test.title}`, user: 'Администратор' });
    }
    return true;
  },
};
