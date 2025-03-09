
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MoreVertical, 
  Plus, 
  Award, 
  Users, 
  Target, 
  BarChart, 
  Clock, 
  Edit2, 
  Trash2,
  Search,
  BookOpen,
  Briefcase,
  DollarSign,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Filter,
  LogOut,
  User
} from 'lucide-react';

const ClubDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);
  const [isApplicationsDialogOpen, setIsApplicationsDialogOpen] = useState(false);
  const [isRegistrationsDialogOpen, setIsRegistrationsDialogOpen] = useState(false);
  const [isCreditManagerDialogOpen, setIsCreditManagerDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Form states
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    date: '',
    description: '',
    credits: 0,
    location: '',
    internship: false,
    prizePool: '',
    tags: ''
  });
  
  const [newVacancyForm, setNewVacancyForm] = useState({
    title: '',
    skills: ''
  });

  const [creditForm, setCreditForm] = useState({
    studentId: '',
    credits: 0,
    reason: ''
  });
  
  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Hackathon 2023',
      date: '2023-10-15',
      status: 'upcoming',
      description: 'Annual 24-hour coding competition',
      credits: 20,
      location: 'Main Campus, Building A',
      internship: true,
      prizePool: '$5,000',
      registrations: 87,
      tags: ['technical', 'competition']
    },
    {
      id: 2,
      title: 'Workshop: AI Fundamentals',
      date: '2023-10-05',
      status: 'upcoming',
      description: 'Introduction to artificial intelligence concepts',
      credits: 10,
      location: 'Virtual (Zoom)',
      internship: false,
      prizePool: 'N/A',
      registrations: 42,
      tags: ['workshop', 'technical']
    },
    {
      id: 3,
      title: 'Tech Talk: Industry Trends',
      date: '2023-09-25',
      status: 'past',
      description: 'Panel discussion with industry experts',
      credits: 5,
      location: 'Auditorium B',
      internship: false,
      prizePool: 'N/A',
      registrations: 120,
      tags: ['seminar', 'networking']
    }
  ]);
  
  // Mock data for club members/vacancies
  const [members, setMembers] = useState([
    { id: 1, name: 'Alex Johnson', role: 'President', avatar: '/placeholder.svg' },
    { id: 2, name: 'Sam Williams', role: 'Vice President', avatar: '/placeholder.svg' },
    { id: 3, name: 'Jordan Lee', role: 'Technical Lead', avatar: '/placeholder.svg' },
    { id: 4, name: 'Taylor Chen', role: 'Event Coordinator', avatar: '/placeholder.svg' },
    { id: 5, name: 'Morgan Smith', role: 'Marketing Head', avatar: '/placeholder.svg' }
  ]);
  
  const [vacancies, setVacancies] = useState([
    { id: 1, title: 'Content Creator', skills: ['writing', 'design'], applications: 8 },
    { id: 2, title: 'Web Developer', skills: ['React', 'Node.js'], applications: 12 }
  ]);

  // Mock data for applications
  const [applications, setApplications] = useState([
    { 
      id: 1, 
      position: 'Content Creator', 
      applicant: 'Jamie Smith', 
      studentId: 'S12345678',
      date: '2023-09-20', 
      skills: ['writing', 'photography', 'design'],
      status: 'pending'
    },
    { 
      id: 2, 
      position: 'Web Developer', 
      applicant: 'Riley Johnson', 
      studentId: 'S87654321',
      date: '2023-09-18', 
      skills: ['React', 'JavaScript', 'Node.js'],
      status: 'pending'
    },
    { 
      id: 3, 
      position: 'Content Creator', 
      applicant: 'Casey Brown', 
      studentId: 'S24681012',
      date: '2023-09-15', 
      skills: ['writing', 'social media', 'video editing'],
      status: 'pending'
    }
  ]);

  // Mock data for event registrations
  const [registrations, setRegistrations] = useState([
    { id: 1, eventId: 1, name: 'Jamie Smith', studentId: 'S12345678', date: '2023-09-10' },
    { id: 2, eventId: 1, name: 'Riley Johnson', studentId: 'S87654321', date: '2023-09-12' },
    { id: 3, eventId: 1, name: 'Casey Brown', studentId: 'S24681012', date: '2023-09-14' },
    { id: 4, eventId: 2, name: 'Jamie Smith', studentId: 'S12345678', date: '2023-09-15' },
    { id: 5, eventId: 2, name: 'Morgan Williams', studentId: 'S13579246', date: '2023-09-16' }
  ]);
  
  // Stats data for overview
  const clubStats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalMembers: members.length,
    openPositions: vacancies.length,
    totalRegistrations: events.reduce((sum, event) => sum + event.registrations, 0)
  };
  
  // Handle input changes for event form
  const handleEventFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEventForm({
      ...newEventForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle input changes for vacancy form
  const handleVacancyFormChange = (e) => {
    const { name, value } = e.target;
    setNewVacancyForm({
      ...newVacancyForm,
      [name]: value
    });
  };

  // Handle input changes for credit form
  const handleCreditFormChange = (e) => {
    const { name, value } = e.target;
    setCreditForm({
      ...creditForm,
      [name]: name === 'credits' ? Number(value) : value
    });
  };
  
  // Handle creating a new event
  const handleCreateEvent = () => {
    setIsEventDialogOpen(true);
  };
  
  // Handle submitting new event
  const handleSubmitEvent = () => {
    if (!newEventForm.title || !newEventForm.date || !newEventForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newEvent = {
      id: events.length + 1,
      title: newEventForm.title,
      date: newEventForm.date,
      status: 'upcoming',
      description: newEventForm.description,
      credits: Number(newEventForm.credits) || 0,
      location: newEventForm.location || 'TBD',
      internship: newEventForm.internship,
      prizePool: newEventForm.prizePool || 'N/A',
      registrations: 0,
      tags: newEventForm.tags ? newEventForm.tags.split(',').map(tag => tag.trim()) : []
    };
    
    setEvents([...events, newEvent]);
    setNewEventForm({
      title: '',
      date: '',
      description: '',
      credits: 0,
      location: '',
      internship: false,
      prizePool: '',
      tags: ''
    });
    
    setIsEventDialogOpen(false);
    toast.success('Event created successfully!');
  };
  
  // Handle creating a new vacancy
  const handleCreateVacancy = () => {
    setIsVacancyDialogOpen(true);
  };
  
  // Handle submitting new vacancy
  const handleSubmitVacancy = () => {
    if (!newVacancyForm.title || !newVacancyForm.skills) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newVacancy = {
      id: vacancies.length + 1,
      title: newVacancyForm.title,
      skills: newVacancyForm.skills.split(',').map(skill => skill.trim()),
      applications: 0
    };
    
    setVacancies([...vacancies, newVacancy]);
    setNewVacancyForm({
      title: '',
      skills: ''
    });
    
    setIsVacancyDialogOpen(false);
    toast.success('Position added successfully!');
  };
  
  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event deleted successfully!');
  };

  // Handle viewing applications for a position
  const handleViewApplications = (positionTitle) => {
    const positionApplications = applications.filter(app => app.position === positionTitle);
    if (positionApplications.length > 0) {
      setApplications(positionApplications);
      setIsApplicationsDialogOpen(true);
    } else {
      toast.info('No applications received yet for this position');
    }
  };

  // Handle viewing registrations for an event
  const handleViewRegistrations = (event) => {
    setSelectedEvent(event);
    const eventRegistrations = registrations.filter(reg => reg.eventId === event.id);
    
    if (eventRegistrations.length > 0) {
      setRegistrations(eventRegistrations);
      setIsRegistrationsDialogOpen(true);
    } else {
      toast.info('No registrations yet for this event');
    }
  };

  // Handle application status change
  const handleApplicationStatus = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
    
    toast.success(`Application ${status === 'accepted' ? 'accepted' : 'rejected'}`);
  };

  // Handle credit score update
  const handleCreditUpdate = () => {
    if (!creditForm.studentId || !creditForm.credits || !creditForm.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would update the database
    toast.success(`Credits updated for Student ID: ${creditForm.studentId}`, {
      description: `${creditForm.credits} credits added for ${creditForm.reason}`
    });

    setCreditForm({
      studentId: '',
      credits: 0,
      reason: ''
    });

    setIsCreditManagerDialogOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Handle search
  const handleSearch = () => {
    // In a real app, this would query the database
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }

    toast.success(`Search results for "${searchQuery}"`, {
      description: "Search functionality would filter results in a real app"
    });
  };

  // Filter events based on category
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.tags.includes(filter));
  
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Club Dashboard</h1>
          <p className="text-muted-foreground">Manage your club's events and members</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCreditManagerDialogOpen(true)}>
            <Award className="mr-2 h-4 w-4" />
            Credit Manager
          </Button>
          <Button variant="outline" onClick={handleCreateVacancy}>
            <Users className="mr-2 h-4 w-4" />
            New Position
          </Button>
          <Button onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info("Profile settings would open here")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Team</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{clubStats.totalEvents}</h3>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{clubStats.totalMembers}</h3>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{clubStats.totalRegistrations}</h3>
                  <p className="text-sm text-muted-foreground">Registrations</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{clubStats.openPositions}</h3>
                  <p className="text-sm text-muted-foreground">Open Positions</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter(event => event.status === 'upcoming')
                    .map(event => (
                      <div key={event.id} className="flex justify-between items-start p-3 rounded-lg border transition-colors hover:bg-muted/50">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant="secondary" className="mt-2">
                            {event.registrations} registrations
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewRegistrations(event)}
                          >
                            <Users className="h-3 w-3 mr-1" />
                            Registrations
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit Event
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                    
                  {events.filter(event => event.status === 'upcoming').length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No upcoming events. Create one now!
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full" onClick={handleCreateEvent}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vacancies.map(vacancy => (
                    <div key={vacancy.id} className="p-3 rounded-lg border transition-colors hover:bg-muted/50">
                      <div className="font-medium">{vacancy.title}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {vacancy.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {vacancy.applications} applications
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handleViewApplications(vacancy.title)}
                      >
                        <Users className="h-3 w-3 mr-1" />
                        View Applications
                      </Button>
                    </div>
                  ))}
                  
                  {vacancies.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No open positions. Add one now!
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={handleCreateVacancy}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Position
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleSearch}>
                Search
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    All Events
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('technical')}>
                    Technical
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('workshop')}>
                    Workshop
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('seminar')}>
                    Seminar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('competition')}>
                    Competition
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('networking')}>
                    Networking
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {filter !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  {filter}
                  <Button 
                    variant="ghost" 
                    className="h-4 w-4 p-0 ml-2" 
                    onClick={() => setFilter('all')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
            </div>
            <Button onClick={handleCreateEvent}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <div className={`h-2 w-full ${event.status === 'upcoming' ? 'bg-primary' : 'bg-muted'}`} />
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <p className="text-sm mb-3">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.credits} credits</span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.prizePool}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.internship ? 'Internship available' : 'No internship'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.registrations} registrations</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mt-3">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => handleViewRegistrations(event)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Registrations
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="col-span-2 text-center py-10 border rounded-lg bg-muted/10">
                <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <h3 className="text-lg font-medium">No events found</h3>
                <p className="text-muted-foreground mb-4">Create your first event to get started</p>
                <Button onClick={handleCreateEvent}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {members.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No team members yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vacancies.map(vacancy => (
                  <div key={vacancy.id} className="space-y-3 p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{vacancy.title}</h3>
                      <Badge variant="outline">{vacancy.applications} applications</Badge>
                    </div>
                    
                    <div className="text-sm">Required skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {vacancy.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleViewApplications(vacancy.title)}
                      >
                        <Users className="h-3 w-3 mr-1" />
                        View Applicants
                      </Button>
                    </div>
                  </div>
                ))}
                
                {vacancies.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No open positions. Add one now!
                  </div>
                )}
                
                <Button className="w-full" onClick={handleCreateVacancy}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Position
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Event Creation Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new event for your club.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title*</Label>
              <Input
                id="title"
                name="title"
                value={newEventForm.title}
                onChange={handleEventFormChange}
                placeholder="Enter event title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Event Date*</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newEventForm.date}
                onChange={handleEventFormChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={newEventForm.description}
                onChange={handleEventFormChange}
                placeholder="Event description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  value={newEventForm.credits}
                  onChange={handleEventFormChange}
                  placeholder="0"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={newEventForm.location}
                  onChange={handleEventFormChange}
                  placeholder="Event location"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prizePool">Prize Pool</Label>
                <Input
                  id="prizePool"
                  name="prizePool"
                  value={newEventForm.prizePool}
                  onChange={handleEventFormChange}
                  placeholder="Prize details"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="internship"
                  name="internship"
                  checked={newEventForm.internship}
                  onCheckedChange={(checked) => 
                    setNewEventForm({...newEventForm, internship: checked})
                  }
                />
                <Label htmlFor="internship">Internship Available</Label>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={newEventForm.tags}
                onChange={handleEventFormChange}
                placeholder="technical, workshop, etc. (comma-separated)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Vacancy Creation Dialog */}
      <Dialog open={isVacancyDialogOpen} onOpenChange={setIsVacancyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Position</DialogTitle>
            <DialogDescription>
              Add a new open position to your club.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Position Title*</Label>
              <Input
                id="title"
                name="title"
                value={newVacancyForm.title}
                onChange={handleVacancyFormChange}
                placeholder="Enter position title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="skills">Required Skills*</Label>
              <Input
                id="skills"
                name="skills"
                value={newVacancyForm.skills}
                onChange={handleVacancyFormChange}
                placeholder="React, design, writing, etc. (comma-separated)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVacancyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitVacancy}>Add Position</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Applications Dialog */}
      <Dialog open={isApplicationsDialogOpen} onOpenChange={setIsApplicationsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Applications</DialogTitle>
            <DialogDescription>
              Review applications for this position.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
            {applications.map(app => (
              <div key={app.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{app.applicant}</h3>
                    <p className="text-sm text-muted-foreground">Student ID: {app.studentId}</p>
                    <p className="text-sm text-muted-foreground">Applied: {new Date(app.date).toLocaleDateString()}</p>
                  </div>
                  
                  {app.status === 'pending' ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : app.status === 'accepted' ? (
                    <Badge variant="default">Accepted</Badge>
                  ) : (
                    <Badge variant="destructive">Rejected</Badge>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {app.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {app.status === 'pending' && (
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleApplicationStatus(app.id, 'rejected')}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleApplicationStatus(app.id, 'accepted')}
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {applications.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="mt-2 font-medium">No applications yet</h3>
                <p className="text-sm text-muted-foreground">
                  Applications will appear here once students apply.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Registrations Dialog */}
      <Dialog open={isRegistrationsDialogOpen} onOpenChange={setIsRegistrationsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? `Registrations for ${selectedEvent.title}` : 'Event Registrations'}
            </DialogTitle>
            <DialogDescription>
              Students who have registered for this event.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
            {registrations.map(reg => (
              <div key={reg.id} className="flex justify-between items-center p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{reg.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{reg.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Student ID: {reg.studentId}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(reg.date).toLocaleDateString()}
                </div>
              </div>
            ))}
            
            {registrations.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="mt-2 font-medium">No registrations yet</h3>
                <p className="text-sm text-muted-foreground">
                  Registrations will appear here once students sign up.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Credit Manager Dialog */}
      <Dialog open={isCreditManagerDialogOpen} onOpenChange={setIsCreditManagerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Credit Score Manager</DialogTitle>
            <DialogDescription>
              Update student credit scores based on activities.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID*</Label>
              <Input
                id="studentId"
                name="studentId"
                value={creditForm.studentId}
                onChange={handleCreditFormChange}
                placeholder="Enter student ID (e.g., S12345678)"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="credits">Credits to Add/Subtract*</Label>
              <Input
                id="credits"
                name="credits"
                type="number"
                value={creditForm.credits}
                onChange={handleCreditFormChange}
                placeholder="0"
              />
              <p className="text-sm text-muted-foreground">
                Use positive values to add credits, negative to subtract.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason*</Label>
              <Textarea
                id="reason"
                name="reason"
                value={creditForm.reason}
                onChange={handleCreditFormChange}
                placeholder="Reason for credit update"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreditManagerDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreditUpdate}>Update Credits</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClubDashboard;
