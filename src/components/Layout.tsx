import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from './Sidebar';
import { User, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonAction?: () => void;
}

const Layout = ({ 
  children, 
  title, 
  subtitle, 
  showBackButton = false, 
  backButtonAction 
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 p-0"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  {showBackButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={backButtonAction}
                      className="h-9 w-9 p-0"
                    >
                      ←
                    </Button>
                  )}
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="h-9">
                  <User className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Admin User</span>
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

export default Layout;
