
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold text-xl">Collegiopia</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting students with campus opportunities for academic growth and extracurricular excellence.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              {['Dashboard', 'Events', 'Clubs', 'Certificates'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Help Center', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase mb-4">Subscribe</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Stay updated with the latest events and opportunities
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="glass-input px-4 py-2 rounded-md text-sm"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Collegiopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
