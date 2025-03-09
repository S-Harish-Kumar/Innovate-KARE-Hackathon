
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { GraduationCap, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const [userType, setUserType] = useState<'student' | 'club'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock login function - would connect to backend in production
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - direct to appropriate dashboard
      if (userType === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/club-dashboard');
      }
      
      toast.success(`Welcome back!`, {
        description: `You've successfully logged in as a ${userType}.`,
      });
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md glass-card animate-scale-in mx-auto">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Sign in to Collegiopia</CardTitle>
        <CardDescription>Enter your details to access your account</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user-type">I am a:</Label>
            <ToggleGroup 
              type="single" 
              value={userType} 
              onValueChange={(value) => value && setUserType(value as 'student' | 'club')}
              className="justify-center w-full"
            >
              <ToggleGroupItem 
                value="student" 
                className={cn(
                  "flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                  "rounded-l-md"
                )}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Student
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="club" 
                className={cn(
                  "flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                  "rounded-r-md"
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                Club
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : "Sign in"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
