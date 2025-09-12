import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTickets } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { QuickStats } from '@/components/QuickStats';
import { ChatWidget } from '@/components/ChatWidget';
import { format } from 'date-fns';
import { Plus, Search, Eye } from 'lucide-react';

const Index = () => {
  const { tickets, loading, fetchTickets } = useTickets();
  const [sortBy, setSortBy] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    fetchTickets(value);
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.submitter_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Facility Management System</h1>
            <p className="text-muted-foreground mt-1">Track and manage all facility tickets</p>
          </div>
          <Button asChild>
            <Link to="/submit">
              <Plus className="h-4 w-4 mr-2" />
              Submit Ticket
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <QuickStats tickets={tickets} />

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-64">
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
                <p className="text-muted-foreground">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchTerm ? 'No tickets found matching your search.' : 'No tickets yet. Submit your first ticket!'}
                </p>
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono text-xs">
                            #{ticket.id.slice(-6)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium max-w-64">
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
                          <div className="truncate text-sm text-muted-foreground" title={ticket.assigned_to || 'Unassigned'}>
                            {ticket.assigned_to || 'Unassigned'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {ticket.expected_date ? (
                            <span className={`text-sm ${
                              new Date(ticket.expected_date) < new Date() && ticket.status !== 'Closed'
                                ? 'text-red-600 font-medium'
                                : 'text-muted-foreground'
                            }`}>
                              {format(new Date(ticket.expected_date), 'MMM d, yyyy')}
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not set</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
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

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </div>
  );
};

export default Index;
