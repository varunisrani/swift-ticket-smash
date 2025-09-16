import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, UserContextType } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Mock users for demonstration purposes
const mockUsers: Record<UserRole, User> = {
  customer: {
    id: '1',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'customer'
  },
  manager: {
    id: '2',
    email: 'manager@example.com',
    name: 'Sarah Manager',
    role: 'manager'
  },
  admin: {
    id: '3',
    email: 'admin@example.com',
    name: 'Alex Administrator',
    role: 'admin'
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize with a default user (admin for demo purposes)
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    const initialRole = savedRole && savedRole in mockUsers ? savedRole : 'admin';
    setUser(mockUsers[initialRole]);
  }, []);

  // Save role to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('userRole', user.role);
    }
  }, [user]);

  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const isAuthenticated = user !== null;

  const value: UserContextType = {
    user,
    setUser,
    isAuthenticated,
    switchRole
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Custom hook for checking permissions
export const usePermissions = () => {
  const { user } = useUser();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    // Import rolePermissions here to avoid circular dependency
    const rolePermissions: Record<UserRole, string[]> = {
      customer: ['view_own_tickets', 'create_ticket', 'comment_on_own_tickets'],
      manager: ['view_all_tickets', 'create_ticket', 'assign_tickets', 'update_status', 'comment_on_all_tickets'],
      admin: ['view_all_tickets', 'create_ticket', 'assign_tickets', 'update_status', 'delete_tickets', 'manage_users', 'comment_on_all_tickets', 'view_analytics']
    };

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isAtLeastRole = (minRole: UserRole): boolean => {
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      customer: 1,
      manager: 2,
      admin: 3
    };

    return roleHierarchy[user.role] >= roleHierarchy[minRole];
  };

  return {
    hasPermission,
    isRole,
    isAtLeastRole,
    userRole: user?.role
  };
};