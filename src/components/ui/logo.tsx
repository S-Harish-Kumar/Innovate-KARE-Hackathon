
import { BookOpen } from "lucide-react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`bg-primary text-primary-foreground p-2 rounded-full ${className}`}>
      <BookOpen className="h-5 w-5" />
    </div>
  );
};
