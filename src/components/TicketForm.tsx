import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTickets } from '@/hooks/useTickets';
import { useNavigate } from 'react-router-dom';

export const TicketForm = () => {
  const navigate = useNavigate();
  const { createTicket } = useTickets();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    submitter_email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTicket(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.submitter_email}
                  onChange={(e) => handleChange('submitter_email', e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={loading || !formData.title || !formData.category || !formData.submitter_email}
                  className="flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </div>
            </form>
      </CardContent>
    </Card>
  );
};