
import { useState } from 'react';
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
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Bookmark, 
  Calendar, 
  Clock, 
  FileText, 
  Gift,
  Layers,
  MoreVertical, 
  Search,
  Star,
  Users,
  Filter,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Briefcase,
  Medal,
  Check,
  LogOut,
  User
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [registrationDialog, setRegistrationDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock student data
  const studentData = {
    name: 'Jamie Smith',
    id: 'S12345678',
    avatar: '/placeholder.svg',
    totalCredits: 75,
    creditsGoal: 150,
    certifications: [
      { id: 1, name: 'Web Development Fundamentals', issuer: 'Tech Club', date: '2023-08-15' },
      { id: 2, name: 'Public Speaking', issuer: 'Debate Society', date: '2023-06-22' }
    ],
    clubs: [
      { id: 1, name: 'Tech Club', role: 'Member', avatar: '/placeholder.svg' },
      { id: 2, name: 'Photography Club', role: 'Secretary', avatar: '/placeholder.svg' }
    ]
  };
  
  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Hackathon 2023',
      organizer: 'Tech Club',
      date: '2023-10-15',
      credits: 20,
      location: 'Main Campus, Building A',
      category: 'technical',
      internship: true,
      prizePool: '$5,000',
      saved: true,
      description: 'Join us for a 24-hour coding challenge where you can build innovative solutions, network with industry professionals, and win exciting prizes.'
    },
    {
      id: 2,
      title: 'Workshop: AI Fundamentals',
      organizer: 'AI Research Group',
      date: '2023-10-05',
      credits: 10,
      location: 'Virtual (Zoom)',
      category: 'workshop',
      internship: false,
      prizePool: 'N/A',
      saved: false,
      description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop. Perfect for beginners!'
    },
    {
      id: 3,
      title: 'Annual Cultural Fest',
      organizer: 'Cultural Committee',
      date: '2023-11-12',
      credits: 15,
      location: 'University Grounds',
      category: 'cultural',
      internship: false,
      prizePool: 'N/A',
      saved: false,
      description: 'Celebrate diversity through music, dance, art, and food at our annual cultural festival. Performances from students across campus.'
    },
    {
      id: 4,
      title: 'Inter-College Sports Tournament',
      organizer: 'Sports Club',
      date: '2023-10-20',
      credits: 25,
      location: 'University Stadium',
      category: 'sports',
      internship: false,
      prizePool: '$2,500',
      saved: true,
      description: 'Compete against teams from other colleges in various sports disciplines. Great opportunity to showcase your athletic abilities.'
    }
  ]);
  
  // Mock club recruitment notices
  const recruitmentNotices = [
    {
      id: 1,
      club: 'Debate Society',
      position: 'Event Coordinator',
      deadline: '2023-10-10',
      skills: ['public speaking', 'organization', 'leadership']
    },
    {
      id: 2,
      club: 'Tech Club',
      position: 'Web Developer',
      deadline: '2023-10-15',
      skills: ['React', 'JavaScript', 'CSS']
    }
  ];
  
  // History of past events
  const eventHistory = [
    {
      id: 101,
      title: 'Tech Talk: Industry Trends',
      organizer: 'Tech Club',
      date: '2023-09-05',
      credits: 5,
      category: 'seminar'
    },
    {
      id: 102,
      title: 'Photography Contest',
      organizer: 'Photography Club',
      date: '2023-08-20',
      credits: 15,
      category: 'competition'
    },
    {
      id: 103,
      title: 'Volunteer Day: Campus Cleanup',
      organizer: 'Environmental Club',
      date: '2023-07-15',
      credits: 10,
      category: 'volunteer'
    }
  ];
  
  // Toggle saving an event (bookmarking)
  const toggleSaveEvent = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, saved: !event.saved } 
        : event
    ));
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast.success(
        event.saved 
          ? `Removed from saved events` 
          : `Added to saved events`,
        {
          description: event.title,
        }
      );
    }
  };

  // Handle event registration
  const openRegistrationDialog = (event: any) => {
    setSelectedEvent(event);
    setRegistrationDialog(true);
  };

  const handleEventRegistration = () => {
    if (selectedEvent) {
      if (!registeredEvents.includes(selectedEvent.id)) {
        setRegisteredEvents([...registeredEvents, selectedEvent.id]);
        toast.success('Successfully registered!', {
          description: `You've registered for ${selectedEvent.title}`,
        });
      } else {
        toast.info('Already registered', {
          description: `You're already registered for this event`,
        });
      }
      setRegistrationDialog(false);
    }
  };

  // Apply for club positions
  const handleApplyForClub = (position: string, club: string) => {
    toast.success('Application submitted!', {
      description: `Your application for ${position} at ${club} has been submitted. Check your email for confirmation.`,
    });
  };
  
  // Function to calculate credit progress percentage
  const calculateProgress = () => {
    return (studentData.totalCredits / studentData.creditsGoal) * 100;
  };
  
  // Filter events by category
  const [filter, setFilter] = useState('all');
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }

    toast.success(`Search results for "${searchQuery}"`, {
      description: "Search functionality would filter results in a real app"
    });
  };

  // Handle logout
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={studentData.avatar} />
            <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{studentData.name}</h1>
            <p className="text-muted-foreground">Student ID: {studentData.id}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View Transcript
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
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Credits Card */}
          <Card>
            <CardHeader>
              <CardTitle>Credits Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{studentData.totalCredits} / {studentData.creditsGoal}</div>
                  <p className="text-sm text-muted-foreground">Extracurricular Credits</p>
                </div>
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              
              <Progress value={calculateProgress()} className="h-2" />
              
              <p className="text-sm text-muted-foreground">
                You've earned {studentData.totalCredits} credits out of your goal of {studentData.creditsGoal}.
                Continue participating in events to reach your goal.
              </p>
            </CardContent>
          </Card>
          
          {/* Main Overview Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Upcoming Events */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter((_, index) => index < 3) // Just show the first 3 events
                    .map(event => (
                      <div key={event.id} className="flex justify-between items-start p-3 rounded-lg border transition-colors hover:bg-muted/50">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <Badge variant="secondary" className="mt-2">
                            {event.credits} credits
                          </Badge>
                          {registeredEvents.includes(event.id) && (
                            <Badge variant="outline" className="ml-2 mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <Check className="h-3 w-3 mr-1" /> Registered
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!registeredEvents.includes(event.id) && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openRegistrationDialog(event)}
                            >
                              Register
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveEvent(event.id)}
                          >
                            <Bookmark 
                              className={`h-4 w-4 ${event.saved ? 'fill-primary' : ''}`} 
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('events')}>
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.certifications.map(cert => (
                    <div key={cert.id} className="p-3 rounded-lg border transition-colors hover:bg-muted/50">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{cert.issuer}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Issued: {new Date(cert.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Explore More Certifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Club Recruitment Notices */}
          <Card>
            <CardHeader>
              <CardTitle>Club Recruitment Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recruitmentNotices.map(notice => (
                  <div key={notice.id} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{notice.position}</h3>
                        <p className="text-sm text-muted-foreground">{notice.club}</p>
                      </div>
                      <Badge variant="outline">
                        Deadline: {new Date(notice.deadline).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm">Required skills:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {notice.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3"
                      onClick={() => handleApplyForClub(notice.position, notice.club)}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-2 items-center flex-wrap">
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
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
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
                  <DropdownMenuItem onClick={() => setFilter('cultural')}>
                    Cultural
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('sports')}>
                    Sports
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('workshop')}>
                    Workshops
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
            
            <Tabs defaultValue="upcoming" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <div className={`h-2 w-full ${
                  event.category === 'technical' ? 'bg-blue-500' :
                  event.category === 'cultural' ? 'bg-purple-500' :
                  event.category === 'sports' ? 'bg-green-500' :
                  'bg-amber-500'
                }`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveEvent(event.id)}
                    >
                      <Bookmark 
                        className={`h-4 w-4 ${event.saved ? 'fill-primary' : ''}`} 
                      />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">{event.organizer}</div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.credits} credits</span>
                    </div>
                    
                    {event.internship && (
                      <div className="flex items-center col-span-2">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Internship opportunity</span>
                      </div>
                    )}
                    
                    {event.prizePool !== 'N/A' && (
                      <div className="flex items-center col-span-2">
                        <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Prize pool: {event.prizePool}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{event.category}</Badge>
                    {registeredEvents.includes(event.id) ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <Check className="h-4 w-4 mr-1" /> Registered
                      </Badge>
                    ) : (
                      <Button size="sm" onClick={() => openRegistrationDialog(event)}>
                        Register
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Clubs Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>My Clubs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {studentData.clubs.map(club => (
                    <div key={club.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={club.avatar} />
                          <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{club.name}</div>
                          <div className="text-sm text-muted-foreground">{club.role}</div>
                        </div>
                      </div>
                      <Button>View Club</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Popular Clubs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="font-medium">AI Research Group</div>
                    <div className="text-sm text-muted-foreground mt-1">150+ members</div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="font-medium">Debate Society</div>
                    <div className="text-sm text-muted-foreground mt-1">120+ members</div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="font-medium">Environmental Club</div>
                    <div className="text-sm text-muted-foreground mt-1">80+ members</div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      View Details
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  Explore All Clubs
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Open Club Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recruitmentNotices.map(notice => (
                  <div key={notice.id} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{notice.position}</h3>
                        <p className="text-sm text-muted-foreground">{notice.club}</p>
                      </div>
                      <Badge variant="outline">
                        Deadline: {new Date(notice.deadline).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm">Required skills:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {notice.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3"
                      onClick={() => handleApplyForClub(notice.position, notice.club)}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Registration Dialog */}
      <Dialog open={registrationDialog} onOpenChange={setRegistrationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              {selectedEvent && `You're about to register for ${selectedEvent.title}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Event Details</h4>
                <p className="text-sm mt-1">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Date:</span> {new Date(selectedEvent.date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Credits:</span> {selectedEvent.credits}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {selectedEvent.location}
                </div>
                <div>
                  <span className="font-medium">Organizer:</span> {selectedEvent.organizer}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                By registering, you commit to attending this event. Cancellations should be made at least 48 hours before the event.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegistrationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEventRegistration}>
              Confirm Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
