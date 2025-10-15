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
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Tickets</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{totalTickets}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ticket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Open Tickets</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{openTickets}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Closed</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{closedTickets}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{highPriorityTickets}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Overview */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">{electricalTickets}</div>
                  <div className="text-sm text-gray-600 mt-1">Electrical</div>
                  <Link to="/electrical" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{securityTickets}</div>
                  <div className="text-sm text-gray-600 mt-1">Security</div>
                  <Link to="/security" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{itServiceTickets}</div>
                  <div className="text-sm text-gray-600 mt-1">IT Service</div>
                  <Link to="/it-service" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
                    View Portal →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">View All Tickets</h3>
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center sm:hidden flex-shrink-0">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Manage and monitor all complaint tickets</p>
                    <Button asChild variant="outline" className="w-full h-10">
                      <Link to="/admin/all-tickets">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="text-sm">View Tickets</span>
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg items-center justify-center hidden sm:flex flex-shrink-0">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Add New Ticket</h3>
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center sm:hidden flex-shrink-0">
                        <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Create a new complaint ticket</p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full h-10">
                      <Link to="/admin/add-ticket">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="text-sm">Add Ticket</span>
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg items-center justify-center hidden sm:flex flex-shrink-0">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">View Reports</h3>
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center sm:hidden flex-shrink-0">
                        <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Analytics and system insights</p>
                    <Button asChild variant="outline" className="w-full h-10">
                      <Link to="/admin/reports">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <span className="text-sm">View Reports</span>
                      </Link>
                    </Button>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg items-center justify-center hidden sm:flex flex-shrink-0">
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
