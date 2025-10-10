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
import { Search, Ticket, Filter, Eye } from 'lucide-react';

const AllTickets = () => {
  const { tickets, loading, fetchTickets } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
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
      ticket.submitter_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <Layout title="All Tickets" subtitle="View and manage all complaint tickets">
      <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search tickets by title, description, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="HVAC">HVAC</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created_at">Recently Added</SelectItem>
                        <SelectItem value="priority">High Priority</SelectItem>
                        <SelectItem value="expected_date">Due Date</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tickets Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Tickets ({filteredTickets.length})
                  </CardTitle>
                  <Button asChild>
                    <Link to="/add-ticket">
                      <Ticket className="h-4 w-4 mr-2" />
                      New Ticket
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading tickets...</p>
                  </div>
                ) : filteredTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' 
                        ? 'No tickets found matching your filters.' 
                        : 'No tickets available. Create your first ticket!'}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">ID</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Title</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Category</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Status</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Priority</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Submitted By</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Assigned To</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Due Date</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Created</TableHead>
                            <TableHead className="font-semibold text-gray-900 whitespace-nowrap">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id} className="border-gray-200 hover:bg-gray-50">
                              <TableCell className="font-medium whitespace-nowrap">
                                <Badge variant="outline" className="font-mono text-xs">
                                  #{ticket.id.slice(-6)}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <div className="truncate font-medium text-gray-900" title={ticket.title}>
                                  {ticket.title}
                                </div>
                                {ticket.description && (
                                  <div className="text-xs text-gray-500 truncate mt-1" title={ticket.description}>
                                    {ticket.description}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <Badge variant="secondary" className="text-xs">
                                  {ticket.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <StatusBadge status={ticket.status} />
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <PriorityBadge priority={ticket.priority} />
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <div className="text-sm text-gray-900 truncate" title={ticket.submitter_email}>
                                  {ticket.submitter_email}
                                </div>
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <div className="text-sm text-gray-600 truncate" title={ticket.assigned_to || 'Unassigned'}>
                                  {ticket.assigned_to || 'Unassigned'}
                                </div>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
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
                              <TableCell className="whitespace-nowrap">
                                <span className="text-sm text-gray-600">
                                  {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                                </span>
                              </TableCell>
                              <TableCell className="whitespace-nowrap">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/ticket/${ticket.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
    </Layout>
  );
};

export default AllTickets;
