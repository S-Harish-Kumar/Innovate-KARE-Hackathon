
import { useState } from 'react';
import { Calendar, Award, Bookmark, Gift, Briefcase, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export interface EventCardProps {
  id: number;
  title: string;
  organizer: string;
  date: string;
  credits: number;
  category: string;
  location: string;
  description?: string;
  internship?: boolean;
  prizePool?: string;
  saved?: boolean;
  registrations?: number;
  onClick?: () => void;
}

const EventCard = ({
  id,
  title,
  organizer,
  date,
  credits,
  category,
  location,
  description,
  internship = false,
  prizePool = 'N/A',
  saved = false,
  registrations,
  onClick
}: EventCardProps) => {
  const [isSaved, setIsSaved] = useState(saved);
  
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      technical: 'bg-blue-500',
      cultural: 'bg-purple-500',
      sports: 'bg-green-500',
      workshop: 'bg-amber-500',
      competition: 'bg-red-500',
      seminar: 'bg-indigo-500',
      default: 'bg-gray-500',
    };
    
    return categoryColors[category] || categoryColors.default;
  };
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    
    toast.success(
      isSaved 
        ? `Removed from saved events` 
        : `Added to saved events`,
      {
        description: title,
      }
    );
  };
  
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer" 
      onClick={onClick}
    >
      <div className={`h-2 w-full ${getCategoryColor(category)}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveToggle}
            className="h-8 w-8"
          >
            <Bookmark 
              className={`h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} 
            />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">{organizer}</div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {description && (
          <p className="text-sm line-clamp-2">{description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{credits} credits</span>
          </div>
          
          {internship && (
            <div className="flex items-center col-span-2">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Internship opportunity</span>
            </div>
          )}
          
          {prizePool && prizePool !== 'N/A' && (
            <div className="flex items-center col-span-2">
              <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Prize pool: {prizePool}</span>
            </div>
          )}
          
          {registrations !== undefined && (
            <div className="flex items-center col-span-2">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{registrations} registrations</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <Badge variant="outline">{category}</Badge>
          <Button size="sm">Register</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
