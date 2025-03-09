
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-6 text-center p-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-medium">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button>
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
