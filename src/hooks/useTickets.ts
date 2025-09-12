import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Ticket {
  id: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  priority: string;
  submitter_email: string;
  assigned_to: string | null;
  expected_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  comment: string;
  created_by: string;
  created_at: string;
}

const ROUTING_RULES = {
  'IT': 'it_department@company.com',
  'Electrical': 'electrical_dept@company.com',
  'Infrastructure': 'infra_team@company.com'
};

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async (sortBy: string = 'created_at') => {
    setLoading(true);
    try {
      let query = supabase.from('tickets').select('*');
      
      if (sortBy === 'priority') {
        query = query.order('priority', { ascending: false });
      } else if (sortBy === 'expected_date') {
        query = query.order('expected_date', { ascending: true, nullsFirst: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Check for overdue tickets and update status
      const now = new Date().toISOString().split('T')[0];
      const updatedTickets = data?.map(ticket => {
        if (ticket.expected_date && ticket.expected_date < now && ticket.status !== 'Closed') {
          return { ...ticket, status: 'Overdue' };
        }
        return ticket;
      }) || [];

      setTickets(updatedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at' | 'assigned_to' | 'status' | 'expected_date'>) => {
    try {
      const assigned_to = ROUTING_RULES[ticketData.category as keyof typeof ROUTING_RULES] || null;
      
      const { data, error } = await supabase
        .from('tickets')
        .insert([{ ...ticketData, assigned_to, status: 'Awaiting', expected_date: null }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket created successfully",
      });

      await fetchTickets();
      return data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });

      await fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: "Error", 
        description: "Failed to update ticket",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    fetchTickets,
    createTicket,
    updateTicket,
  };
};

export const useTicketComments = (ticketId: string) => {
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    if (!ticketId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ticket_comments')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (comment: string, createdBy: string) => {
    try {
      const { error } = await supabase
        .from('ticket_comments')
        .insert([{ ticket_id: ticketId, comment, created_by: createdBy }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Comment added successfully",
      });

      await fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  return {
    comments,
    loading,
    addComment,
    fetchComments,
  };
};