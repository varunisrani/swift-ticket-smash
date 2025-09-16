import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { UserRole, roleDisplayNames, roleDescriptions } from '@/types/user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Shield, Settings, ChevronDown } from 'lucide-react';

interface RoleSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  className,
  variant = 'compact'
}) => {
  const { user, switchRole } = useUser();

  if (!user) {
    return null;
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'manager':
        return <Settings className="h-4 w-4" />;
      case 'customer':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'customer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Compact variant for navigation header
  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`h-10 px-2 ${className}`}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="text-xs h-4 px-1"
                >
                  {roleDisplayNames[user.role]}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
            Switch Role
          </DropdownMenuLabel>
          {(Object.keys(roleDisplayNames) as UserRole[]).map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => switchRole(role)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                {getRoleIcon(role)}
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{roleDisplayNames[role]}</span>
                  <span className="text-xs text-muted-foreground">
                    {roleDescriptions[role]}
                  </span>
                </div>
                {role === user.role && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Full variant for use in other components
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* User Info */}
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Role Badge */}
      <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
        {getRoleIcon(user.role)}
        <span className="hidden sm:inline">{roleDisplayNames[user.role]}</span>
      </Badge>

      {/* Role Switcher */}
      <Select value={user.role} onValueChange={(role: UserRole) => switchRole(role)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(roleDisplayNames) as UserRole[]).map((role) => (
            <SelectItem key={role} value={role}>
              <div className="flex items-center gap-2">
                {getRoleIcon(role)}
                <div className="flex flex-col">
                  <span className="font-medium">{roleDisplayNames[role]}</span>
                  <span className="text-xs text-muted-foreground">
                    {roleDescriptions[role]}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};