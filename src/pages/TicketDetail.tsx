import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Ticket, useTickets } from '@/hooks/useTickets';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { StatusUpdate } from '@/components/StatusUpdate';
import { CommentsSection } from '@/components/CommentsSection';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Mail, Tag, Clock } from 'lucide-react';

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateTicket } = useTickets();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [expectedDate, setExpectedDate] = useState('');
  const [updatingDate, setUpdatingDate] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTicket(data);
        setExpectedDate(data.expected_date || '');
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleDateUpdate = async () => {
    if (!ticket || !id) return;

    setUpdatingDate(true);
    try {
      const updates: Partial<Ticket> = { expected_date: expectedDate || null };

      // If setting a date and status is "Awaiting", automatically move to "In Progress"
      if (expectedDate && ticket.status === 'Awaiting') {
        updates.status = 'In Progress';
      }

      await updateTicket(id, updates);
      setTicket(prev => prev ? {
        ...prev,
        expected_date: expectedDate || null,
        status: updates.status || prev.status
      } : null);
    } catch (error) {
      console.error('Failed to update date:', error);
    } finally {
      setUpdatingDate(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading ticket...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Ticket not found</p>
            <Button asChild className="mt-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Badge variant="outline" className="font-mono">
            #{ticket.id.slice(-6)}
          </Badge>
        </div>

        {/* Ticket Info */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                  <Badge variant="secondary">{ticket.category}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            {ticket.description && (
              <div>
                <Label className="text-base font-semibold">Description</Label>
                <p className="mt-2 text-muted-foreground whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </div>
            )}

            <Separator />

            {/* Ticket Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Submitted By</Label>
                    <p className="text-sm text-muted-foreground">{ticket.submitter_email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Assigned To</Label>
                    <p className="text-sm text-muted-foreground">
                      {ticket.assigned_to || 'Unassigned'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm text-muted-foreground">{ticket.category}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Created</Label>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(ticket.created_at), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Last Updated</Label>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(ticket.updated_at), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>

                {/* Expected Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Expected Completion Date
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={expectedDate}
                      onChange={(e) => setExpectedDate(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleDateUpdate}
                      disabled={updatingDate || expectedDate === (ticket.expected_date || '')}
                      size="sm"
                    >
                      {updatingDate ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                  {ticket.expected_date && new Date(ticket.expected_date) < new Date() && ticket.status !== 'Closed' && (
                    <p className="text-sm text-red-600 font-medium">This ticket is overdue!</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Update */}
        <StatusUpdate ticket={ticket} />

        {/* Comments */}
        <CommentsSection ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetail;