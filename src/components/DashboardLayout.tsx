import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { useUser } from '@/contexts/UserContext';
import { UserRole, roleDisplayNames } from '@/types/user';
import {
  Home,
  User,
  Users,
  Shield,
  Plus,
  TicketIcon,
  Settings,
  BarChart3,
  UserCog,
  FileText
} from 'lucide-react';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
  exact?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Overview',
    path: '/',
    icon: <Home className="h-4 w-4" />,
    roles: ['admin', 'manager', 'customer'],
    exact: true
  },
  {
    label: 'Submit Ticket',
    path: '/submit',
    icon: <Plus className="h-4 w-4" />,
    roles: ['admin', 'manager', 'customer']
  },
  {
    label: 'Customer Portal',
    path: '/customer',
    icon: <User className="h-4 w-4" />,
    roles: ['admin', 'manager', 'customer']
  },
  {
    label: 'Manager Dashboard',
    path: '/manager',
    icon: <Users className="h-4 w-4" />,
    roles: ['manager', 'admin']
  },
  {
    label: 'Admin Dashboard',
    path: '/admin',
    icon: <Shield className="h-4 w-4" />,
    roles: ['admin']
  }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBreadcrumbs?: boolean;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  showBreadcrumbs = true,
  actions
}) => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const currentUserRole = user?.role;

  // Filter navigation items based on user role
  const allowedNavItems = navigationItems.filter(item =>
    currentUserRole && item.roles.includes(currentUserRole)
  );

  // Determine if current path is active
  const isActivePath = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const navItem = navigationItems.find(item => item.path === currentPath);

      if (navItem) {
        breadcrumbs.push({
          label: navItem.label,
          path: currentPath
        });
      } else {
        // Handle dynamic routes like /ticket/:id
        if (segment === 'ticket' && pathSegments[index + 1]) {
          breadcrumbs.push({
            label: `Ticket #${pathSegments[index + 1].slice(-6)}`,
            path: currentPath + `/${pathSegments[index + 1]}`
          });
        }
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = showBreadcrumbs ? generateBreadcrumbs() : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <TicketIcon className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold hidden sm:block">Swift Ticket</span>
              </Link>
            </div>

            {/* User Info and Role Switcher */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {roleDisplayNames[user.role]}
                    </p>
                  </div>
                </div>
              )}
              <RoleSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-2 overflow-x-auto">
            {allowedNavItems.map((item) => (
              <Button
                key={item.path}
                variant={isActivePath(item.path, item.exact) ? "default" : "ghost"}
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <Link to={item.path} className="flex items-center space-x-2">
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 1 && (
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && <span>/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center space-x-2">{actions}</div>}
            </div>
            <Separator className="mt-4" />
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Swift Ticket System. Built for efficient facility management.
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Support</a>
              <a href="#" className="hover:text-foreground">Documentation</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};