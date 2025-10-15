import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';
import { NotificationPanel } from './NotificationPanel';
import { User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryDisplayName } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

interface PortalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PortalLayout = ({ children, title, subtitle }: PortalLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'electrical':
        return 'text-yellow-600 bg-yellow-50';
      case 'civil':
        return 'text-orange-600 bg-orange-50';
      case 'it':
        return 'text-purple-600 bg-purple-50';
      case 'it_service':
        return 'text-purple-700 bg-purple-100';
      case 'maintenance':
        return 'text-amber-600 bg-amber-50';
      case 'housekeeping':
        return 'text-pink-600 bg-pink-50';
      case 'front_office':
        return 'text-cyan-600 bg-cyan-50';
      case 'security':
        return 'text-green-600 bg-green-50';
      case 'drivers':
        return 'text-slate-600 bg-slate-50';
      case 'general_ward':
        return 'text-blue-600 bg-blue-50';
      case 'icu':
        return 'text-red-600 bg-red-50';
      case 'ot':
        return 'text-violet-600 bg-violet-50';
      case 'nursing':
        return 'text-indigo-600 bg-indigo-50';
      case 'billing':
        return 'text-emerald-600 bg-emerald-50';
      case 'admin':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 p-0"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
                  </div>
                  {user && (
                    <span className={`hidden sm:inline-flex px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(user.category)}`}>
                      {getCategoryDisplayName(user.category)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 w-full sm:w-auto justify-end">
                <NotificationPanel />
                <div className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">{user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-9"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PortalLayout;
