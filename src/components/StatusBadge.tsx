import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Awaiting':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/20';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20 hover:bg-blue-500/20';
      case 'On Hold':
        return 'bg-orange-500/10 text-orange-700 border-orange-500/20 hover:bg-orange-500/20';
      case 'Monitoring':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/20 hover:bg-purple-500/20';
      case 'Closed':
        return 'bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20';
      case 'Overdue':
        return 'bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20 hover:bg-gray-500/20';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        getStatusColor(status),
        'font-medium',
        className
      )}
    >
      {status}
    </Badge>
  );
};