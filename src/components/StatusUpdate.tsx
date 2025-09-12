import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Ticket, useTickets } from '@/hooks/useTickets';

interface StatusUpdateProps {
  ticket: Ticket;
}

const STATUSES = {
  'Awaiting': { next: ['In Progress'] },
  'In Progress': { next: ['Closed', 'On Hold', 'Monitoring'] },
  'On Hold': { next: ['In Progress'], requiresReason: true },
  'Monitoring': { next: ['Closed', 'In Progress'] },
  'Closed': { next: [], canReopen: 'Manager' },
  'Overdue': { next: ['In Progress', 'Closed'] }
};

export const StatusUpdate = ({ ticket }: StatusUpdateProps) => {
  const { updateTicket } = useTickets();
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);
  const [reason, setReason] = useState('');
  const [showReasonField, setShowReasonField] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentStatusConfig = STATUSES[ticket.status as keyof typeof STATUSES];
  const nextStatuses = currentStatusConfig?.next || [];

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    if (newStatus === 'On Hold') {
      setShowReasonField(true);
    } else {
      setShowReasonField(false);
      setReason('');
    }
  };

  const handleUpdate = async () => {
    if (selectedStatus === ticket.status) return;
    if (showReasonField && !reason) return;

    setLoading(true);
    try {
      const updates: Partial<Ticket> = { status: selectedStatus };
      if (reason) {
        updates.description = ticket.description 
          ? `${ticket.description}\n\n[Hold Reason: ${reason}]`
          : `[Hold Reason: ${reason}]`;
      }
      
      await updateTicket(ticket.id, updates);
      setReason('');
      setShowReasonField(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (nextStatuses.length === 0) {
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          No status updates available for {ticket.status} tickets.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Label className="text-base font-semibold">Update Status</Label>
      
      <div className="space-y-3">
        <Select value={selectedStatus} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ticket.status}>{ticket.status} (Current)</SelectItem>
            {nextStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showReasonField && (
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for hold *</Label>
            <Input
              id="reason"
              placeholder="Please provide a reason for putting this ticket on hold"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
        )}

        {selectedStatus !== ticket.status && (
          <Button 
            onClick={handleUpdate}
            disabled={loading || (showReasonField && !reason)}
            className="w-full"
          >
            {loading ? 'Updating...' : `Update to ${selectedStatus}`}
          </Button>
        )}
      </div>
    </div>
  );
};