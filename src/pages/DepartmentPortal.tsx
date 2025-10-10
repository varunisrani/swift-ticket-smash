import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PortalLayout from '@/components/PortalLayout';
import DepartmentReports from '@/components/DepartmentReports';
import { useTickets } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Search, Ticket, Clock, AlertCircle, Plus, Eye, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoryDisplayName } from '@/services/authService';

const DepartmentPortal = () => {
  const { user } = useAuth();
  const { tickets, loading, fetchTickets, createTicket } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState('created_at');
  const [activeView, setActiveView] = useState('dashboard');
  const [showReports, setShowReports] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: user?.category || 'electrical',
    priority: '',
    description: ''
  });

  const handleSortChange = (value: string) => {
    setSortBy(value);
    fetchTickets(value);
  };

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'all-tickets') {
        setActiveView('tickets');
        setShowAddForm(false);
        setShowReports(false);
      } else if (hash === 'add-ticket') {
        setActiveView('add');
        setShowAddForm(true);
        setShowReports(false);
      } else if (hash === 'reports') {
        setActiveView('reports');
        setShowReports(true);
        setShowAddForm(false);
      } else {
        setActiveView('dashboard');
        setShowAddForm(false);
        setShowReports(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.submitter_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalTickets = filteredTickets.length;
  const openTickets = filteredTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const closedTickets = filteredTickets.filter(t => t.status === 'Closed').length;
  const highPriorityTickets = filteredTickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const ticketData = {
        ...formData,
        submitter_email: `${user?.name}@company.com`
      };
      
      await createTicket(ticketData);
      
      // Reset form
      setFormData({
        title: '',
        category: user?.category || 'electrical',
        priority: '',
        description: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <PortalLayout 
      title={`${getCategoryDisplayName(user?.category || '')} Portal`} 
      subtitle={`Manage ${getCategoryDisplayName(user?.category || '').toLowerCase()} tickets`}
    >
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

          {/* Add Ticket Button and Form */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showAddForm ? 'Cancel' : 'Add New Ticket'}
            </Button>
          </div>

          {showAddForm && (
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Create New Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter ticket title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="it_service">IT Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tickets Table */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {getCategoryDisplayName(user?.category || '')} Tickets
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Recently Added</SelectItem>
                      <SelectItem value="priority">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
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
                        <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                        <TableHead className="font-semibold text-gray-900">Submitted By</TableHead>
                        <TableHead className="font-semibold text-gray-900">Created</TableHead>
                        <TableHead className="font-semibold text-gray-900">Actions</TableHead>
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
                            <StatusBadge status={ticket.status} />
                          </TableCell>
                          <TableCell>
                            <PriorityBadge priority={ticket.priority} />
                          </TableCell>
                          <TableCell className="max-w-32">
                            <div className="truncate text-sm text-gray-600" title={ticket.submitter_email}>
                              {ticket.submitter_email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">
                              {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                            </span>
                          </TableCell>
                          <TableCell>
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};

export default DepartmentPortal;
