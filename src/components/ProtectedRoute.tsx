import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getPortalPath } from '@/services/authService';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredCategory?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredCategory 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific category is required, check if user has access
  if (requiredCategory && user.category !== requiredCategory) {
    // Redirect user to their correct portal
    const correctPortal = getPortalPath(user.category);
    return <Navigate to={correctPortal} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
