import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useTickets } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Search, Ticket, Clock, AlertCircle, ChevronDown, Filter, Plus } from 'lucide-react';

const Index = () => {
  const { tickets, loading, fetchTickets } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    fetchTickets(value);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.submitter_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;
  const highPriorityTickets = tickets.filter(t => t.priority === 'High').length;

  return (
    <Layout title="Complaint Management System" subtitle="Track and manage all complaint tickets">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
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
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{inProgressTickets}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
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

          {/* Main Content */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">All Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at">Recently Added</SelectItem>
                    <SelectItem value="priority">High Priority</SelectItem>
                    <SelectItem value="expected_date">Due Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tickets Table */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading tickets...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm ? 'No tickets found matching your search.' : 'No tickets available.'}
                  </p>
                </div>
              ) : (
                <div className="rounded-md border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-semibold text-gray-900">ID</TableHead>
                        <TableHead className="font-semibold text-gray-900">Title</TableHead>
                        <TableHead className="font-semibold text-gray-900">Category</TableHead>
                        <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                        <TableHead className="font-semibold text-gray-900">Assigned To</TableHead>
                        <TableHead className="font-semibold text-gray-900">Due Date</TableHead>
                        <TableHead className="font-semibold text-gray-900">Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id} className="border-gray-200">
                          <TableCell className="font-medium">
                            <Badge variant="outline" className="font-mono text-sm">
                              #{ticket.id.slice(-6)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-900 max-w-64">
                            <div className="truncate" title={ticket.title}>
                              {ticket.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{ticket.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={ticket.status} />
                          </TableCell>
                          <TableCell>
                            <PriorityBadge priority={ticket.priority} />
                          </TableCell>
                          <TableCell className="max-w-32">
                            <div className="truncate text-sm text-gray-600" title={ticket.assigned_to || 'Unassigned'}>
                              {ticket.assigned_to || 'Unassigned'}
                            </div>
                          </TableCell>
                          <TableCell>
                            {ticket.expected_date ? (
                              <span className={`text-sm ${
                                new Date(ticket.expected_date) < new Date() && ticket.status !== 'Closed'
                                  ? 'text-red-600 font-medium'
                                  : 'text-gray-600'
                              }`}>
                                {format(new Date(ticket.expected_date), 'MMM d, yyyy')}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">Not set</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">
                              {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
