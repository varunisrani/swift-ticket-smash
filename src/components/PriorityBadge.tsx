import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/20';
      case 'Low':
        return 'bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20 hover:bg-gray-500/20';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        getPriorityColor(priority),
        'font-medium',
        className
      )}
    >
      {priority}
    </Badge>
  );
};