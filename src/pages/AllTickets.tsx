import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Layout from '@/components/Layout';
import { useTickets } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Search, Ticket, Filter, Eye, Trash2 } from 'lucide-react';

const AllTickets = () => {
  const { tickets, loading, fetchTickets, deleteTicket } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    fetchTickets(value);
  };

  const handleDeleteClick = (ticketId: string) => {
    setTicketToDelete(ticketId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (ticketToDelete) {
      await deleteTicket(ticketToDelete);
      setDeleteDialogOpen(false);
      setTicketToDelete(null);
    }
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
      <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="it_service">IT Service</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="front_office">Front Office</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="drivers">Drivers</SelectItem>
                        <SelectItem value="general_ward">General Ward</SelectItem>
                        <SelectItem value="icu">ICU</SelectItem>
                        <SelectItem value="ot">OT</SelectItem>
                        <SelectItem value="nursing">Nursing</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
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
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
                    Tickets ({filteredTickets.length})
                  </CardTitle>
                  <Button asChild className="w-full sm:w-auto h-10">
                    <Link to="/add-ticket">
                      <Ticket className="h-4 w-4 mr-2" />
                      <span className="text-sm">New Ticket</span>
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading tickets...</p>
                  </div>
                ) : filteredTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">
                      {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
                        ? 'No tickets found matching your filters.'
                        : 'No tickets available. Create your first ticket!'}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table className="min-w-full">
                        <TableHeader className="bg-gray-50">
                          <TableRow>
                            <TableHead className="font-semibold text-gray-900 w-[80px]">ID</TableHead>
                            <TableHead className="font-semibold text-gray-900 min-w-[200px]">Title</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[100px]">Department</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[110px]">Status</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[90px]">Priority</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[140px] hidden md:table-cell">Submitted By</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[120px] hidden lg:table-cell">Assigned To</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[100px] hidden xl:table-cell">Due Date</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[100px] hidden xl:table-cell">Created</TableHead>
                            <TableHead className="font-semibold text-gray-900 w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id} className="border-gray-200 hover:bg-gray-50">
                              <TableCell className="font-medium">
                                <Badge variant="outline" className="font-mono text-xs">
                                  #{ticket.id.slice(-6)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="truncate font-medium text-gray-900 max-w-[200px]" title={ticket.title}>
                                  {ticket.title}
                                </div>
                                {ticket.description && (
                                  <div className="text-xs text-gray-500 truncate mt-1 max-w-[200px]" title={ticket.description}>
                                    {ticket.description}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="text-xs">
                                  {ticket.category}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={ticket.status} />
                              </TableCell>
                              <TableCell>
                                <PriorityBadge priority={ticket.priority} />
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="text-sm text-gray-900 truncate max-w-[140px]" title={ticket.submitter_email}>
                                  {ticket.submitter_email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="text-sm text-gray-600 truncate max-w-[120px]" title={ticket.assigned_to || 'Unassigned'}>
                                  {ticket.assigned_to || 'Unassigned'}
                                </div>
                              </TableCell>
                              <TableCell className="hidden xl:table-cell">
                                {ticket.expected_date ? (
                                  <span className={`text-xs ${
                                    new Date(ticket.expected_date) < new Date() && ticket.status !== 'Closed'
                                      ? 'text-red-600 font-medium'
                                      : 'text-gray-600'
                                  }`}>
                                    {format(new Date(ticket.expected_date), 'MMM d')}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 text-xs">-</span>
                                )}
                              </TableCell>
                              <TableCell className="hidden xl:table-cell">
                                <span className="text-xs text-gray-600">
                                  {format(new Date(ticket.created_at), 'MMM d')}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                                    <Link to={`/ticket/${ticket.id}`}>
                                      <Eye className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteClick(ticket.id)}
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the ticket
                and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </Layout>
  );
};

export default AllTickets;
