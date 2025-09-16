import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Users,
  Ticket,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser, usePermissions } from '@/contexts/UserContext';

// Mock data for tickets
const mockTickets = [
  {
    id: 'TKT-001',
    title: 'Login issue on mobile app',
    description: 'Unable to login using mobile credentials',
    status: 'open',
    priority: 'high',
    category: 'technical',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    assignedTo: 'Sarah Manager',
    customer: {
      name: 'John Customer',
      email: 'customer@example.com',
      avatar: ''
    }
  },
  {
    id: 'TKT-002',
    title: 'Feature request: Dark mode',
    description: 'Request for dark theme implementation',
    status: 'in_progress',
    priority: 'medium',
    category: 'feature_request',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    assignedTo: 'Alex Administrator',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: ''
    }
  },
  {
    id: 'TKT-003',
    title: 'Payment processing error',
    description: 'Error during checkout process',
    status: 'resolved',
    priority: 'high',
    category: 'billing',
    createdAt: '2024-01-13T16:20:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
    assignedTo: 'Sarah Manager',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: ''
    }
  },
  {
    id: 'TKT-004',
    title: 'General inquiry about services',
    description: 'Questions about premium features',
    status: 'open',
    priority: 'low',
    category: 'general',
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T08:45:00Z',
    assignedTo: null,
    customer: {
      name: 'Lisa Davis',
      email: 'lisa@example.com',
      avatar: ''
    }
  },
  {
    id: 'TKT-005',
    title: 'Account suspension issue',
    description: 'Account was suspended without notice',
    status: 'in_progress',
    priority: 'high',
    category: 'account',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    assignedTo: 'Alex Administrator',
    customer: {
      name: 'Robert Wilson',
      email: 'robert@example.com',
      avatar: ''
    }
  }
];

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Customer',
    email: 'customer@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '2024-01-15T12:30:00Z',
    ticketsCount: 3,
    avatar: ''
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-15T14:20:00Z',
    ticketsCount: 0,
    avatar: ''
  },
  {
    id: '3',
    name: 'Alex Administrator',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T15:45:00Z',
    ticketsCount: 0,
    avatar: ''
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '2024-01-14T18:20:00Z',
    ticketsCount: 1,
    avatar: ''
  },
  {
    id: '5',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'customer',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    ticketsCount: 2,
    avatar: ''
  }
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { hasPermission } = usePermissions();

  // State for filters and search
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState('all');
  const [ticketPriorityFilter, setTicketPriorityFilter] = useState('all');
  const [ticketCategoryFilter, setTicketCategoryFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Filter tickets based on search and filters
  const filteredTickets = useMemo(() => {
    return mockTickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(ticketSearch.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(ticketSearch.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(ticketSearch.toLowerCase());
      const matchesStatus = ticketStatusFilter === 'all' || ticket.status === ticketStatusFilter;
      const matchesPriority = ticketPriorityFilter === 'all' || ticket.priority === ticketPriorityFilter;
      const matchesCategory = ticketCategoryFilter === 'all' || ticket.category === ticketCategoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [ticketSearch, ticketStatusFilter, ticketPriorityFilter, ticketCategoryFilter]);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                           user.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchesRole = userRoleFilter === 'all' || user.role === userRoleFilter;

      return matchesSearch && matchesRole;
    });
  }, [userSearch, userRoleFilter]);

  // This should not be needed anymore since we have ProtectedRoute handling this
  // But keeping it as a failsafe
  if (!hasPermission('view_analytics')) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-600 text-center">
          You don't have permission to access the admin dashboard.
        </p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go to Home
        </Button>
      </div>
    );
  }

  // Analytics data
  const ticketStatusData = [
    { name: 'Open', value: mockTickets.filter(t => t.status === 'open').length, color: '#ef4444' },
    { name: 'In Progress', value: mockTickets.filter(t => t.status === 'in_progress').length, color: '#f59e0b' },
    { name: 'Resolved', value: mockTickets.filter(t => t.status === 'resolved').length, color: '#10b981' }
  ];

  const ticketPriorityData = [
    { name: 'High', count: mockTickets.filter(t => t.priority === 'high').length },
    { name: 'Medium', count: mockTickets.filter(t => t.priority === 'medium').length },
    { name: 'Low', count: mockTickets.filter(t => t.priority === 'low').length }
  ];

  const ticketTrendData = [
    { date: '2024-01-10', tickets: 2 },
    { date: '2024-01-11', tickets: 1 },
    { date: '2024-01-12', tickets: 3 },
    { date: '2024-01-13', tickets: 1 },
    { date: '2024-01-14', tickets: 2 },
    { date: '2024-01-15', tickets: 4 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: { variant: 'destructive' as const, icon: AlertCircle },
      in_progress: { variant: 'secondary' as const, icon: Clock },
      resolved: { variant: 'default' as const, icon: CheckCircle }
    };

    const config = variants[status as keyof typeof variants] || variants.open;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive' as const,
      medium: 'secondary' as const,
      low: 'outline' as const
    };

    return (
      <Badge variant={variants[priority as keyof typeof variants] || 'outline'}>
        {priority}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'destructive' as const,
      manager: 'secondary' as const,
      customer: 'outline' as const
    };

    return (
      <Badge variant={variants[role as keyof typeof variants] || 'outline'}>
        {role}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockTickets.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ticketStatusData[0].value}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((ticketStatusData[0].value / mockTickets.length) * 100)}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {mockUsers.filter(u => u.status === 'active').length} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((ticketStatusData[2].value / mockTickets.length) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={ticketStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ticketStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">TKT-003 was resolved</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New ticket TKT-005 created</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">TKT-002 assigned to Alex</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {/* Ticket Management Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Ticket Management</h2>
                <p className="text-gray-600">Comprehensive ticket overview and management</p>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tickets..."
                      value={ticketSearch}
                      onChange={(e) => setTicketSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={ticketStatusFilter} onValueChange={setTicketStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={ticketPriorityFilter} onValueChange={setTicketPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={ticketCategoryFilter} onValueChange={setTicketCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tickets Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.title}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {ticket.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={ticket.customer.avatar} />
                              <AvatarFallback>
                                {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{ticket.customer.name}</p>
                              <p className="text-xs text-gray-500">{ticket.customer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>
                          {ticket.assignedTo ? (
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{ticket.assignedTo}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(ticket.createdAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/ticket/${ticket.id}`)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Assign
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-gray-600">Manage system users and permissions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* User Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Tickets</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(user.lastLogin)}
                        </TableCell>
                        <TableCell>{user.ticketsCount}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analytics & Reports</h2>
              <p className="text-gray-600">Detailed insights and statistics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ticket Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Creation Trend</CardTitle>
                  <CardDescription>Daily ticket volume over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ticketTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Priority Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Priority Distribution</CardTitle>
                  <CardDescription>Tickets by priority level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ticketPriorityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Average Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.4 days</div>
                  <p className="text-green-600 text-sm">-0.3 days from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.2/5</div>
                  <p className="text-green-600 text-sm">+0.1 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>First Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1.2 hours</div>
                  <p className="text-green-600 text-sm">-0.2 hours from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default AdminDashboard;