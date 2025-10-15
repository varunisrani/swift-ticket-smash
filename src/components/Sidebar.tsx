import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Home, FileText, X, BarChart3, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryDisplayName } from '@/services/authService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [
      { path: '/', label: 'Dashboard', icon: Home },
    ];

    // For admin portal, add additional navigation items
    if (user.category === 'admin') {
      baseItems.push(
        { path: '/admin/all-tickets', label: 'All Tickets', icon: FileText },
        { path: '/admin/add-ticket', label: 'Add Ticket', icon: Ticket },
        { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
        { path: '/admin/users', label: 'Users', icon: Users }
      );
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 overflow-y-auto`}>
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <Ticket className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
              {user ? `${getCategoryDisplayName(user.category)} Portal` : 'Swift Portal'}
            </h1>
            <p className="text-xs text-gray-500 truncate">
              {user ? `${getCategoryDisplayName(user.category).toLowerCase()} management` : 'Complaint System'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-9 w-9 p-0 flex-shrink-0"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            asChild
            className={`w-full justify-start h-11 sm:h-10 text-sm sm:text-base ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Link to={item.path} onClick={onClose}>
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
