export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  metaDescription: string;
  metaKeywords: string;
  featuredImage?: string;
  template: 'default' | 'landing' | 'blog' | 'contact';
  parentId?: string;
  sortOrder: number;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  uploadedAt: string;
  alt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  createdAt: string;
  isSystem: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  avatar?: string;
  oidcSubject?: string; // ID от OIDC провайдера
  lastLogin?: string;
}

export interface OIDCConfig {
  enabled: boolean;
  provider: string;
  authority: string;
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scope: string[];
  roleClaim: string; // Название claim для ролей (например: 'role', 'groups', 'roles')
  roleMapping: Record<string, string>; // Маппинг OIDC ролей на роли CMS
  autoCreateUsers: boolean;
  defaultRoleId: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  duration: number; // в минутах
  passingScore: number; // в процентах
  allowedRoles: string[];
  linkedPageId?: string; // ID страницы, к которой привязан тест
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  reporter: string;
  reporterEmail: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments: TicketComment[];
  attachments: TicketAttachment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  isInternal: boolean; // Внутренний комментарий (виден только сотрудникам)
}

export interface TicketAttachment {
  id: string;
  ticketId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface HelpDeskSettings {
  enabled: boolean;
  defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
  defaultCategory: string;
  categories: string[];
  autoAssign: boolean;
  emailNotifications: boolean;
  slaEnabled: boolean;
  slaResponseTime: number; // в часах
  slaResolutionTime: number; // в часах
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'text';
  options: string[];
  correctAnswers: number[];
  points: number;
}

export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  action: string;
  target: string;
  user: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: string;
}
