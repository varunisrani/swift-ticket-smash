import React from 'react';
import { useUser, usePermissions } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export const RoleDemo: React.FC = () => {
  const { user } = useUser();
  const { hasPermission, isRole, isAtLeastRole } = usePermissions();

  if (!user) {
    return null;
  }

  const permissions = [
    'view_own_tickets',
    'view_all_tickets',
    'create_ticket',
    'assign_tickets',
    'update_status',
    'delete_tickets',
    'manage_users',
    'comment_on_own_tickets',
    'comment_on_all_tickets',
    'view_analytics'
  ];

  const roleFeatures = {
    customer: [
      'Submit new support tickets',
      'View and track own tickets',
      'Comment on own tickets',
      'Receive email notifications'
    ],
    manager: [
      'View all team tickets',
      'Assign tickets to team members',
      'Update ticket status and priority',
      'Comment on all tickets',
      'Set expected completion dates'
    ],
    admin: [
      'Full system access',
      'Manage user accounts and roles',
      'Delete tickets and data',
      'View system analytics',
      'Configure system settings'
    ]
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Role-Based Access Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Role Info */}
        <Alert>
          <AlertDescription>
            You are currently logged in as <strong>{user.name}</strong> with the role of{' '}
            <Badge variant="secondary">{user.role}</Badge>. Switch roles using the dropdown in the header to see different permissions and features.
          </AlertDescription>
        </Alert>

        {/* Role-specific Features */}
        <div>
          <h4 className="font-semibold mb-3">Features available to {user.role}s:</h4>
          <ul className="space-y-2">
            {roleFeatures[user.role].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Permission Matrix */}
        <div>
          <h4 className="font-semibold mb-3">Permission Matrix:</h4>
          <div className="grid gap-2">
            {permissions.map((permission) => (
              <div key={permission} className="flex items-center justify-between p-2 rounded-lg border">
                <span className="text-sm font-mono">{permission}</span>
                <div className="flex items-center gap-2">
                  {hasPermission(permission) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {hasPermission(permission) ? 'Allowed' : 'Denied'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Hierarchy */}
        <div>
          <h4 className="font-semibold mb-3">Role Hierarchy Check:</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg border">
              <span className="text-sm">Is at least Customer level?</span>
              <Badge variant={isAtLeastRole('customer') ? 'default' : 'secondary'}>
                {isAtLeastRole('customer') ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg border">
              <span className="text-sm">Is at least Manager level?</span>
              <Badge variant={isAtLeastRole('manager') ? 'default' : 'secondary'}>
                {isAtLeastRole('manager') ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg border">
              <span className="text-sm">Is at least Admin level?</span>
              <Badge variant={isAtLeastRole('admin') ? 'default' : 'secondary'}>
                {isAtLeastRole('admin') ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Specific Role Checks */}
        <div>
          <h4 className="font-semibold mb-3">Role-specific Messages:</h4>
          <div className="space-y-2">
            {isRole('customer') && (
              <Alert>
                <AlertDescription>
                  As a customer, you can submit tickets and track your requests. Need to assign tickets? Contact your manager.
                </AlertDescription>
              </Alert>
            )}
            {isRole('manager') && (
              <Alert>
                <AlertDescription>
                  As a manager, you have oversight of your team's tickets and can assign work. You can view all tickets but cannot delete them.
                </AlertDescription>
              </Alert>
            )}
            {isRole('admin') && (
              <Alert>
                <AlertDescription className="text-red-900">
                  As an admin, you have full system access. Use this power responsibly!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};