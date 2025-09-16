import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { Plus, User, Shield, Users } from 'lucide-react';
import { usePermissions } from '@/contexts/UserContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonLink?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Facility Management System",
  subtitle = "Track and manage all facility tickets",
  showCreateButton = true,
  createButtonText = "Submit Ticket",
  createButtonLink = "/submit"
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      {/* Title Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        {/* Role Switcher */}
        <RoleSwitcher className="order-4 sm:order-1" />

        {/* Admin Dashboard Button - Only for admins */}
        {hasPermission('view_analytics') && (
          <Button variant="outline" asChild className="order-2 sm:order-2 w-full sm:w-auto">
            <Link to="/admin">
              <Shield className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          </Button>
        )}

        {/* Manager Dashboard Button - Only for managers */}
        {hasPermission('assign_tickets') && !hasPermission('view_analytics') && (
          <Button variant="outline" asChild className="order-2 sm:order-2 w-full sm:w-auto">
            <Link to="/manager">
              <Users className="h-4 w-4 mr-2" />
              Manager Dashboard
            </Link>
          </Button>
        )}

        {/* Customer Portal Button */}
        <Button variant="outline" asChild className="order-3 sm:order-3 w-full sm:w-auto">
          <Link to="/customer">
            <User className="h-4 w-4 mr-2" />
            Customer Portal
          </Link>
        </Button>

        {/* Create Button */}
        {showCreateButton && (
          <Button asChild className="order-1 sm:order-4 w-full sm:w-auto">
            <Link to={createButtonLink}>
              <Plus className="h-4 w-4 mr-2" />
              {createButtonText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};