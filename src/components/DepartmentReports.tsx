import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { TrendingUp, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryDisplayName } from '@/services/authService';

const DepartmentReports = () => {
  const { tickets } = useTickets();
  const { user } = useAuth();

  // Calculate metrics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;
  const highPriorityTickets = tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;

  // Status distribution
  const statusData = [
    { name: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: 'bg-blue-500' },
    { name: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: 'bg-yellow-500' },
    { name: 'Closed', value: tickets.filter(t => t.status === 'Closed').length, color: 'bg-green-500' },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Low', value: tickets.filter(t => t.priority === 'Low').length },
    { name: 'Medium', value: tickets.filter(t => t.priority === 'Medium').length },
    { name: 'High', value: tickets.filter(t => t.priority === 'High').length },
    { name: 'Urgent', value: tickets.filter(t => t.priority === 'Urgent').length },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{totalTickets}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{openTickets}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{closedTickets}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{highPriorityTickets}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{status.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{status.value}</span>
                    {totalTickets > 0 && (
                      <span className="text-sm text-gray-500">
                        ({Math.round((status.value / totalTickets) * 100)}%)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityData.map((priority, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={priority.name === 'Urgent' ? 'destructive' : 
                               priority.name === 'High' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {priority.name}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{priority.value}</span>
                    {totalTickets > 0 && (
                      <span className="text-sm text-gray-500">
                        ({Math.round((priority.value / totalTickets) * 100)}%)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {getCategoryDisplayName(user?.category || '')} Department Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <p>This report shows the current status of all {getCategoryDisplayName(user?.category || '').toLowerCase()} tickets.</p>
            <p className="mt-2">
              <strong>Performance Metrics:</strong>
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Resolution Rate: {totalTickets > 0 ? Math.round((closedTickets / totalTickets) * 100) : 0}%</li>
              <li>Active Tickets: {openTickets}</li>
              <li>High Priority Items: {highPriorityTickets}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentReports;
