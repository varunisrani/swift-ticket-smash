export type UserRole = 'customer' | 'admin' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
}

export const rolePermissions: Record<UserRole, string[]> = {
  customer: ['view_own_tickets', 'create_ticket', 'comment_on_own_tickets'],
  manager: ['view_all_tickets', 'create_ticket', 'assign_tickets', 'update_status', 'comment_on_all_tickets'],
  admin: ['view_all_tickets', 'create_ticket', 'assign_tickets', 'update_status', 'delete_tickets', 'manage_users', 'comment_on_all_tickets', 'view_analytics']
};

export const roleDisplayNames: Record<UserRole, string> = {
  customer: 'Customer',
  manager: 'Manager',
  admin: 'Administrator'
};

export const roleDescriptions: Record<UserRole, string> = {
  customer: 'Submit tickets and track your own requests',
  manager: 'Manage tickets and assign work to team members',
  admin: 'Full system access with user management capabilities'
};