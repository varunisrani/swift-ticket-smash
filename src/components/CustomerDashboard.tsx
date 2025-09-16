import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Ticket } from '@/hooks/useTickets';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  Search,
  Ticket as TicketIcon,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  MessageSquare,
  Eye,
  ArrowLeft,
  Home
} from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { CommentsSection } from '@/components/CommentsSection';

export const CustomerDashboard = () => {
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchCustomerTickets = async (customerEmail: string) => {
    if (!customerEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to view tickets",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('submitter_email', customerEmail.trim().toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process tickets to check for overdue status
      const now = new Date().toISOString().split('T')[0];
      const processedTickets = data?.map(ticket => {
        if (ticket.expected_date && ticket.expected_date < now && ticket.status !== 'Closed') {
          return { ...ticket, status: 'Overdue' };
        }
        return ticket;
      }) || [];

      setTickets(processedTickets);

      toast({
        title: "Success",
        description: `Found ${processedTickets.length} ticket(s) for ${customerEmail}`,
      });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tickets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchCustomerTickets(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'awaiting':
        return <Clock className="h-4 w-4" />;
      case 'in progress':
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <TicketIcon className="h-4 w-4" />;
    }
  };

  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => ['open', 'awaiting', 'in progress', 'in-progress'].includes(t.status.toLowerCase())).length,
      resolved: tickets.filter(t => ['resolved', 'closed'].includes(t.status.toLowerCase())).length,
      overdue: tickets.filter(t => t.status.toLowerCase() === 'overdue').length,
    };
    return stats;
  };

  const stats = getTicketStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Dashboard
            </Link>
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link to="/submit" className="flex items-center gap-2">
              <TicketIcon className="h-4 w-4" />
              Submit New Ticket
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <User className="h-8 w-8 text-blue-600" />
            Customer Support Portal
          </h1>
          <p className="text-gray-600 text-lg">
            Track your support tickets and get updates on your requests
          </p>
        </div>

        {/* Email Search */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Find Your Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address (e.g., customer@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading || !email.trim()}
                className="h-12 px-6"
              >
                {loading ? 'Searching...' : 'Search Tickets'}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Enter the email address you used when submitting your support tickets
            </p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Tickets</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                  </div>
                  <TicketIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Open/In Progress</p>
                    <p className="text-2xl font-bold text-yellow-700">{stats.open}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-700">{stats.overdue}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tickets List */}
        {hasSearched && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-blue-600" />
                Your Support Tickets
                {tickets.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading your tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-12">
                  <TicketIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                  <p className="text-gray-500">
                    No support tickets were found for the email address <strong>{email}</strong>.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Make sure you're using the same email address you used when submitting tickets.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(ticket.status)}
                            <h3 className="font-semibold text-lg text-gray-900">
                              {ticket.title}
                            </h3>
                            <StatusBadge status={ticket.status} />
                            <PriorityBadge priority={ticket.priority} />
                          </div>

                          {ticket.description && (
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {ticket.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Created: {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                            </div>

                            {ticket.expected_date && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Expected: {format(new Date(ticket.expected_date), 'MMM d, yyyy')}
                              </div>
                            )}

                            <Badge variant="outline" className="text-xs">
                              {ticket.category}
                            </Badge>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-4"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getStatusIcon(ticket.status)}
                                {ticket.title}
                              </DialogTitle>
                            </DialogHeader>

                            {selectedTicket && (
                              <div className="space-y-6">
                                {/* Ticket Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                                    <div className="mt-1">
                                      <StatusBadge status={selectedTicket.status} />
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Priority</Label>
                                    <div className="mt-1">
                                      <PriorityBadge priority={selectedTicket.priority} />
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Category</Label>
                                    <p className="mt-1 text-sm">{selectedTicket.category}</p>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Created</Label>
                                    <p className="mt-1 text-sm">
                                      {format(new Date(selectedTicket.created_at), 'MMM d, yyyy h:mm a')}
                                    </p>
                                  </div>

                                  {selectedTicket.expected_date && (
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Expected Resolution</Label>
                                      <p className="mt-1 text-sm">
                                        {format(new Date(selectedTicket.expected_date), 'MMM d, yyyy')}
                                      </p>
                                    </div>
                                  )}

                                  {selectedTicket.assigned_to && (
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Assigned To</Label>
                                      <p className="mt-1 text-sm">{selectedTicket.assigned_to}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Description */}
                                {selectedTicket.description && (
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Description</Label>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                      <p className="text-sm whitespace-pre-wrap">{selectedTicket.description}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Comments Section */}
                                <div className="border-t pt-6">
                                  <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold">Communication</h3>
                                  </div>
                                  <CommentsSection ticketId={selectedTicket.id} />
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};