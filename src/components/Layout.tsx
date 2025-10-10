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
                  {showBackButton && (
                    <Button variant="ghost" size="sm" onClick={backButtonAction}>
                      ←
                    </Button>
                  )}
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Admin User
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
