export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  externalId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  userRoles?: UserRole[];
  rolePermissions?: RolePermission[];
  pageRoles?: PageRole[];
}

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  user?: User;
  role?: Role;
}

export interface RolePermission {
  id: number;
  roleId: number;
  permission: string;
  role?: Role;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished: boolean;
  publishedAt?: string;
  parentPageId?: number;
  sortOrder: number;
  template?: string;
  createdAt: string;
  updatedAt?: string;
  parentPage?: Page;
  childPages?: Page[];
  pageRoles?: PageRole[];
}

export interface PageRole {
  id: number;
  pageId: number;
  roleId: number;
  page?: Page;
  role?: Role;
}

export interface HelpDeskTicket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'InProgress' | 'WaitingForCustomer' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requesterId?: number;
  assigneeId?: number;
  category?: string;
  createdAt: string;
  updatedAt?: string;
  requester?: User;
  assignee?: User;
  comments?: HelpDeskComment[];
}

export interface HelpDeskComment {
  id: number;
  ticketId: number;
  content: string;
  authorId: number;
  isInternal: boolean;
  createdAt: string;
  ticket?: HelpDeskTicket;
  author?: User;
}

export interface HelpDeskSettings {
  id: number;
  isEnabled: boolean;
  defaultCategory?: string;
  defaultPriority: number;
  allowAnonymousTickets: boolean;
  autoResponseMessage?: string;
}

export interface ApiKey {
  id: number;
  name: string;
  key: string;
  description?: string;
  expiresAt: string;
  isActive: boolean;
  allowedRoles: string[];
}

export interface PageCreateDto {
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished: boolean;
  parentPageId?: number;
  sortOrder: number;
  template?: string;
}

export interface PageUpdateDto {
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished: boolean;
  parentPageId?: number;
  sortOrder: number;
  template?: string;
}

export interface PagePreviewDto {
  title?: string;
  content?: string;
  template?: string;
  slug: string;
}

export interface RoleCreateDto {
  name: string;
  description: string;
  isActive: boolean;
}

export interface RoleUpdateDto {
  name: string;
  description: string;
  isActive: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  roles: string[];
}
