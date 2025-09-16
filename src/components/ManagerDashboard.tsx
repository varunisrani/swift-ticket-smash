import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  ArrowUp,
  ArrowDown,
  Target,
  Activity,
  Calendar,
  Eye,
  UserPlus,
  BarChart3,
  Timer
} from 'lucide-react';
import { PriorityBadge } from '@/components/PriorityBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { useTickets, Ticket } from '@/hooks/useTickets';
import { cn } from '@/lib/utils';

// Extended team member interface for manager view
interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  activeTickets: number;
  resolvedToday: number;
  avgResolutionTime: number; // in hours
  capacity: number; // max tickets they can handle
  status: 'available' | 'busy' | 'away';
  skills: string[];
}

// Mock team data - in real app would come from API
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    avatar: '',
    role: 'Senior Technician',
    department: 'IT',
    activeTickets: 5,
    resolvedToday: 3,
    avgResolutionTime: 4.2,
    capacity: 8,
    status: 'available',
    skills: ['Network', 'Hardware', 'Software']
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    avatar: '',
    role: 'Facilities Specialist',
    department: 'Infrastructure',
    activeTickets: 3,
    resolvedToday: 2,
    avgResolutionTime: 6.1,
    capacity: 6,
    status: 'busy',
    skills: ['HVAC', 'Plumbing', 'Electrical']
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    avatar: '',
    role: 'IT Support',
    department: 'IT',
    activeTickets: 7,
    resolvedToday: 1,
    avgResolutionTime: 8.3,
    capacity: 8,
    status: 'available',
    skills: ['Desktop Support', 'Mobile', 'Printers']
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: '',
    role: 'Electrical Technician',
    department: 'Electrical',
    activeTickets: 2,
    resolvedToday: 4,
    avgResolutionTime: 3.8,
    capacity: 5,
    status: 'available',
    skills: ['Wiring', 'Lighting', 'Power Systems']
  },
  {
    id: '5',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    avatar: '',
    role: 'Junior Technician',
    department: 'IT',
    activeTickets: 4,
    resolvedToday: 2,
    avgResolutionTime: 5.7,
    capacity: 6,
    status: 'away',
    skills: ['Basic Support', 'Installation']
  }
];

export const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, loading } = useTickets();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Filter team members by department
  const filteredTeamMembers = useMemo(() => {
    if (selectedDepartment === 'all') return mockTeamMembers;
    return mockTeamMembers.filter(member => member.department === selectedDepartment);
  }, [selectedDepartment]);

  // Get priority tickets (High priority or Overdue)
  const priorityTickets = useMemo(() => {
    return tickets
      .filter(ticket => ticket.priority === 'High' || ticket.status === 'Overdue')
      .sort((a, b) => {
        // Sort overdue first, then by priority
        if (a.status === 'Overdue' && b.status !== 'Overdue') return -1;
        if (b.status === 'Overdue' && a.status !== 'Overdue') return 1;
        return 0;
      })
      .slice(0, 10); // Show top 10 priority tickets
  }, [tickets]);

  // Team performance metrics
  const teamMetrics = useMemo(() => {
    const totalCapacity = filteredTeamMembers.reduce((sum, member) => sum + member.capacity, 0);
    const totalActiveTickets = filteredTeamMembers.reduce((sum, member) => sum + member.activeTickets, 0);
    const totalResolvedToday = filteredTeamMembers.reduce((sum, member) => sum + member.resolvedToday, 0);
    const avgResolutionTime = filteredTeamMembers.reduce((sum, member) => sum + member.avgResolutionTime, 0) / filteredTeamMembers.length;
    const utilization = (totalActiveTickets / totalCapacity) * 100;

    return {
      totalTeamMembers: filteredTeamMembers.length,
      availableMembers: filteredTeamMembers.filter(m => m.status === 'available').length,
      totalCapacity,
      totalActiveTickets,
      totalResolvedToday,
      avgResolutionTime: isNaN(avgResolutionTime) ? 0 : avgResolutionTime,
      utilization: isNaN(utilization) ? 0 : utilization
    };
  }, [filteredTeamMembers]);

  // Workload distribution data
  const workloadData = useMemo(() => {
    return filteredTeamMembers.map(member => ({
      ...member,
      utilizationPercentage: Math.round((member.activeTickets / member.capacity) * 100)
    }));
  }, [filteredTeamMembers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'away':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    return `${hours.toFixed(1)}h`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Team coordination and workload management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Tickets
          </Button>
        </div>
      </div>

      {/* Team Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground">
              {teamMetrics.availableMembers} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(teamMetrics.utilization)}%</div>
            <Progress value={teamMetrics.utilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{teamMetrics.totalResolvedToday}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {formatTime(teamMetrics.avgResolutionTime)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.totalActiveTickets}</div>
            <p className="text-xs text-muted-foreground">
              of {teamMetrics.totalCapacity} capacity
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Overview</TabsTrigger>
          <TabsTrigger value="priority">Priority Queue</TabsTrigger>
          <TabsTrigger value="workload">Workload Distribution</TabsTrigger>
        </TabsList>

        {/* Team Overview Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedDepartment === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDepartment('all')}
            >
              All Departments
            </Button>
            <Button
              variant={selectedDepartment === 'IT' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDepartment('IT')}
            >
              IT
            </Button>
            <Button
              variant={selectedDepartment === 'Infrastructure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDepartment('Infrastructure')}
            >
              Infrastructure
            </Button>
            <Button
              variant={selectedDepartment === 'Electrical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDepartment('Electrical')}
            >
              Electrical
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn('text-xs', getStatusColor(member.status))}
                    >
                      {member.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active</p>
                      <p className="font-semibold">{member.activeTickets}/{member.capacity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Resolved Today</p>
                      <p className="font-semibold text-green-600">{member.resolvedToday}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Resolution</p>
                      <p className="font-semibold">{formatTime(member.avgResolutionTime)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-semibold">{member.department}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Workload</span>
                      <span>{Math.round((member.activeTickets / member.capacity) * 100)}%</span>
                    </div>
                    <Progress
                      value={(member.activeTickets / member.capacity) * 100}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Priority Queue Tab */}
        <TabsContent value="priority" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Priority Ticket Queue
                  </CardTitle>
                  <CardDescription>
                    High priority and overdue tickets requiring immediate attention
                  </CardDescription>
                </div>
                <Badge variant="destructive">{priorityTickets.length} urgent</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityTickets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p>No priority tickets at the moment!</p>
                    <p className="text-sm">Your team is handling everything well.</p>
                  </div>
                ) : (
                  priorityTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/ticket/${ticket.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{ticket.title}</h3>
                            {ticket.status === 'Overdue' && (
                              <Badge variant="destructive" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Overdue
                              </Badge>
                            )}
                            <PriorityBadge priority={ticket.priority} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {ticket.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Category: {ticket.category}</span>
                            <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                            {ticket.assigned_to && (
                              <span>Assigned: {ticket.assigned_to}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <StatusBadge status={ticket.status} />
                          {ticket.expected_date && (
                            <div className="text-xs text-muted-foreground">
                              Due: {new Date(ticket.expected_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workload Distribution Tab */}
        <TabsContent value="workload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Workload Distribution</CardTitle>
              <CardDescription>
                Current workload and capacity for each team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workloadData.map((member) => (
                  <div key={member.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant="outline"
                          className={cn('text-xs', getStatusColor(member.status))}
                        >
                          {member.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {member.activeTickets}/{member.capacity}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.utilizationPercentage}% utilized
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-300',
                          getUtilizationColor(member.utilizationPercentage)
                        )}
                        style={{ width: `${Math.min(member.utilizationPercentage, 100)}%` }}
                      />
                      {member.utilizationPercentage > 100 && (
                        <div
                          className="absolute top-0 left-0 h-full bg-red-600 opacity-50 rounded-full"
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Overloaded Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workloadData
                    .filter(member => member.utilizationPercentage >= 90)
                    .map(member => (
                      <div key={member.id} className="flex items-center justify-between text-sm">
                        <span>{member.name}</span>
                        <Badge variant="destructive" className="text-xs">
                          {member.utilizationPercentage}%
                        </Badge>
                      </div>
                    ))}
                  {workloadData.filter(member => member.utilizationPercentage >= 90).length === 0 && (
                    <p className="text-sm text-muted-foreground">No overloaded members</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Available Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workloadData
                    .filter(member => member.utilizationPercentage < 70 && member.status === 'available')
                    .map(member => (
                      <div key={member.id} className="flex items-center justify-between text-sm">
                        <span>{member.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {member.capacity - member.activeTickets} free
                        </Badge>
                      </div>
                    ))}
                  {workloadData.filter(member => member.utilizationPercentage < 70 && member.status === 'available').length === 0 && (
                    <p className="text-sm text-muted-foreground">All members busy</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workloadData
                    .sort((a, b) => b.resolvedToday - a.resolvedToday)
                    .slice(0, 3)
                    .map(member => (
                      <div key={member.id} className="flex items-center justify-between text-sm">
                        <span>{member.name}</span>
                        <Badge variant="outline" className="text-xs text-green-600">
                          {member.resolvedToday} resolved
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};