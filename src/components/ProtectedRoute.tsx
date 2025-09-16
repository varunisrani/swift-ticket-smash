import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, usePermissions } from '@/contexts/UserContext';
import { UserRole } from '@/types/user';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  minRole?: UserRole;
  redirectTo?: string;
  fallbackComponent?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  minRole,
  redirectTo = '/',
  fallbackComponent
}) => {
  const { user, isAuthenticated } = useUser();
  const { hasPermission, isRole, isAtLeastRole } = usePermissions();

  // If not authenticated, redirect to home
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check specific role requirement
  if (requiredRole && !isRole(requiredRole)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    return <Navigate to={redirectTo} replace />;
  }

  // Check minimum role requirement
  if (minRole && !isAtLeastRole(minRole)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    return <Navigate to={redirectTo} replace />;
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Access Denied Component
export const AccessDenied: React.FC<{ message?: string }> = ({
  message = "You don't have permission to access this page."
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert className="border-red-200 bg-red-50">
          <Shield className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {message}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

// Role-based component renderer
interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: string;
  fallback?: React.ReactNode;
  minRole?: UserRole;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
  minRole
}) => {
  const { user } = useUser();
  const { hasPermission, isAtLeastRole } = usePermissions();

  if (!user) return <>{fallback}</>;

  // Check allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  // Check minimum role
  if (minRole && !isAtLeastRole(minRole)) {
    return <>{fallback}</>;
  }

  // Check permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};