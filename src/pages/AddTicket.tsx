import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { Ticket, Upload, X, Home, FileText, BarChart3, Users, Settings, Menu, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTickets } from '@/hooks/useTickets';

const AddTicket = () => {
  const navigate = useNavigate();
  const { createTicket } = useTickets();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Add submitter email (you may want to get this from user context or auth)
      const ticketData = {
        ...formData,
        submitter_email: 'user@example.com' // TODO: Get from authentication
      };
      
      const newTicket = await createTicket(ticketData);
      
      // Redirect to ticket detail page
      if (newTicket?.id) {
        navigate(`/ticket/${newTicket.id}`);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <Layout 
      title="Submit New Ticket" 
      subtitle="Create a new complaint ticket"
      showBackButton={true}
      backButtonAction={() => window.history.back()}
    >

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ticket Information */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Ticket Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter ticket title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">Department</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
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
                    </div>
                    
                    <div>
                      <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</Label>
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
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                    <Button type="button" variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Submit Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
    </Layout>
  );
};

export default AddTicket;
