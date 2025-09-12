import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/hooks/useTickets';
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';

interface QuickStatsProps {
  tickets: Ticket[];
}

export const QuickStats = ({ tickets }: QuickStatsProps) => {
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => !['Closed'].includes(t.status)).length,
    overdue: tickets.filter(t => t.status === 'Overdue').length,
    closedToday: tickets.filter(t => {
      if (t.status !== 'Closed') return false;
      const today = new Date().toISOString().split('T')[0];
      const ticketDate = t.updated_at.split('T')[0];
      return ticketDate === today;
    }).length,
  };

  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.total,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: 'Open',
      value: stats.open,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
    },
    {
      title: 'Closed Today',
      value: stats.closedToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};