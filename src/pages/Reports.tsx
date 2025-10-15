import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTickets } from '@/hooks/useTickets';
import { format, subDays, isAfter, isBefore } from 'date-fns';
import Layout from '@/components/Layout';
import { 
  Ticket, Download, Calendar, BarChart3, Clock, CheckCircle, AlertCircle 
} from 'lucide-react';

const Reports = () => {
  const { tickets, loading } = useTickets();
  const [dateRange, setDateRange] = useState('30days');

  // Calculate date range
  const getDateRange = () => {
    const endDate = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case '7days':
        startDate = subDays(endDate, 7);
        break;
      case '30days':
        startDate = subDays(endDate, 30);
        break;
      case '90days':
        startDate = subDays(endDate, 90);
        break;
      case '1year':
        startDate = subDays(endDate, 365);
        break;
      default:
        startDate = subDays(endDate, 30);
    }
    
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange();

  // Filter tickets by date range
  const filteredTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.created_at);
    return isAfter(ticketDate, startDate) && isBefore(ticketDate, endDate);
  });

  // Calculate metrics
  const totalTickets = filteredTickets.length;
  const openTickets = filteredTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const resolvedTickets = filteredTickets.filter(t => t.status === 'Closed').length;
  
  // Calculate average resolution time (mock data for now)
  const avgResolutionTime = 3.5; // days

  // Ticket status data for charts
  const statusData = [
    { name: 'Open', value: filteredTickets.filter(t => t.status === 'Open').length, color: 'bg-blue-500' },
    { name: 'In Progress', value: filteredTickets.filter(t => t.status === 'In Progress').length, color: 'bg-yellow-500' },
    { name: 'Closed', value: filteredTickets.filter(t => t.status === 'Closed').length, color: 'bg-green-500' },
    { name: 'Overdue', value: filteredTickets.filter(t => t.status === 'Overdue').length, color: 'bg-red-500' }
  ];

  // Category distribution data
  const categoryData = [
    { name: 'Electrical', value: filteredTickets.filter(t => t.category === 'Electrical').length },
    { name: 'Plumbing', value: filteredTickets.filter(t => t.category === 'Plumbing').length },
    { name: 'HVAC', value: filteredTickets.filter(t => t.category === 'HVAC').length },
    { name: 'Cleaning', value: filteredTickets.filter(t => t.category === 'Cleaning').length },
    { name: 'Security', value: filteredTickets.filter(t => t.category === 'Security').length },
    { name: 'Other', value: filteredTickets.filter(t => t.category === 'Other').length }
  ];

  // Mock data for response time trend
  const responseTimeData = [
    { date: 'Mon', avgTime: 2.1 },
    { date: 'Tue', avgTime: 3.2 },
    { date: 'Wed', avgTime: 2.8 },
    { date: 'Thu', avgTime: 4.1 },
    { date: 'Fri', avgTime: 3.5 },
    { date: 'Sat', avgTime: 1.9 },
    { date: 'Sun', avgTime: 1.5 }
  ];

  // Recent activities (mock data)
  const recentActivities = [
    {
      id: '1',
      ticketId: '#C97C55',
      title: 'Electrical Issue in Hall',
      activity: 'Status changed to In Progress',
      user: 'John Smith',
      time: '2 hours ago'
    },
    {
      id: '2',
      ticketId: '#A23B89',
      title: 'Water Leak in Restroom',
      activity: 'Ticket resolved',
      user: 'Jane Doe',
      time: '5 hours ago'
    },
    {
      id: '3',
      ticketId: '#F45D12',
      title: 'AC Not Working',
      activity: 'Assigned to HVAC Team',
      user: 'Admin',
      time: '1 day ago'
    },
    {
      id: '4',
      ticketId: '#E78C34',
      title: 'Broken Window',
      activity: 'New ticket created',
      user: 'Mike Johnson',
      time: '2 days ago'
    }
  ];

  const handleExport = () => {
    console.log('Exporting report...');
    // TODO: Implement export functionality
  };

  return (
    <Layout title="Reports" subtitle="Analytics and insights for complaint management">
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 sm:gap-4 sm:space-x-0">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{totalTickets}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-blue-600" />
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
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{resolvedTickets}</p>
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
                    <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{avgResolutionTime}d</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Status Chart */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Ticket Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusData.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                        <span className="text-sm font-medium text-gray-700">{status.name}</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">{status.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">{category.value}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-gray-600 mt-2">{category.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Time Trend */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Response Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 px-4">
                {responseTimeData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full max-w-16 bg-blue-500 rounded-t"
                      style={{ height: `${(data.avgTime / 5) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.date}</span>
                    <span className="text-xs font-medium text-gray-900">{data.avgTime}d</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-900">Ticket</TableHead>
                      <TableHead className="font-semibold text-gray-900">Activity</TableHead>
                      <TableHead className="font-semibold text-gray-900">User</TableHead>
                      <TableHead className="font-semibold text-gray-900">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.map((activity, index) => (
                      <TableRow key={index} className="border-gray-200">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{activity.ticketId}</div>
                            <div className="text-sm text-gray-600">{activity.title}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900">{activity.activity}</TableCell>
                        <TableCell className="text-gray-900">{activity.user}</TableCell>
                        <TableCell className="text-gray-600">{activity.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
