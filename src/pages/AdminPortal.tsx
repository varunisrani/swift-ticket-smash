import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PortalLayout from '@/components/PortalLayout';
import { useTickets } from '@/hooks/useTickets';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Ticket, Clock, AlertCircle, Plus, FileText, BarChart3 } from 'lucide-react';
import { getCategoryDisplayName } from '@/services/authService';

const AdminPortal = () => {
  const { tickets } = useTickets();

  // Calculate metrics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;
  const highPriorityTickets = tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;

  // Category breakdown
  const electricalTickets = tickets.filter(t => t.category === 'electrical').length;
  const securityTickets = tickets.filter(t => t.category === 'security').length;
  const itServiceTickets = tickets.filter(t => t.category === 'it_service').length;

  return (
    <PortalLayout 
      title="Admin Portal" 
      subtitle="Manage all department tickets and system overview"
    >
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    <AlertCircle className="h-6 w-6 text-green-600" />
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

          {/* Department Overview */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{electricalTickets}</div>
                  <div className="text-sm text-gray-600">Electrical</div>
                  <Link to="/electrical" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{securityTickets}</div>
                  <div className="text-sm text-gray-600">Security</div>
                  <Link to="/security" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{itServiceTickets}</div>
                  <div className="text-sm text-gray-600">IT Service</div>
                  <Link to="/it-service" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">View All Tickets</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage and monitor all complaint tickets</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/admin/all-tickets">
                        <FileText className="h-4 w-4 mr-2" />
                        View Tickets
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Add New Ticket</h3>
                    <p className="text-sm text-gray-600 mb-4">Create a new complaint ticket</p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
                      <Link to="/admin/add-ticket">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Ticket
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
                    <p className="text-sm text-gray-600 mb-4">Analytics and system insights</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/admin/reports">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Reports
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default AdminPortal;
