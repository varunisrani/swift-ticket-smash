import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';
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
      case 'security':
        return 'text-green-600 bg-green-50';
      case 'it_service':
        return 'text-purple-600 bg-purple-50';
      case 'admin':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-3">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                  </div>
                  {user && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(user.category)}`}>
                      {getCategoryDisplayName(user.category)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
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
