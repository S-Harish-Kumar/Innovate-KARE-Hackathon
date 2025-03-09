
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, GraduationCap, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Clubs', href: '/clubs', icon: User },
    { label: 'Student Portal', href: '/dashboard', icon: GraduationCap },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md py-4 px-6 md:px-10',
        isScrolled ? 'glass-card shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="font-bold text-xl tracking-tight">Collegiopia</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "px-3 py-2 rounded-full transition-all duration-200",
                  location.pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          <div className="ml-4 flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="rounded-full">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 p-6 border-t flex flex-col space-y-4 md:hidden transition-all duration-300 transform",
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-left pl-4 rounded-md",
                location.pathname === item.href && "bg-primary/10 text-primary"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
        <div className="pt-4 border-t border-border flex flex-col space-y-2">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="w-full">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
